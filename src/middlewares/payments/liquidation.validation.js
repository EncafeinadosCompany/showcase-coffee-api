const { body } = require('express-validator');
const validationMiddleware = require('../../validateRequest');
const { idValidation } = require('../validationRules');

const liquidationValidation = [
    body('current_debt')
        .notEmpty().withMessage('The current debt is required')
        .isDecimal({ decimal_digits: '0,2' }).withMessage('The current debt must have up to 2 decimal places')
        .custom((value) => {
            const num = parseFloat(value);
            if (num < 0) {
                throw new Error('The current debt cannot be negative');
            }
            if (num >= 100000000) { 
                throw new Error('The current debt exceeds maximum allowed value');
            }
            return true;
        })
        .toFloat(),

    body('id_shopping')
        .custom(idValidation('id_shopping'))
        .custom(async (value, { req }) => {
            const shopping = await ShoppingModel.findByPk(value);
            if (!shopping) {
                throw new Error('Shopping not found');
            }
            const existingLiquidation = await LiquidationModel.findOne({
                where: { id_shopping: value }
            });
            if (existingLiquidation) {
                throw new Error('A liquidation already exists for this shopping');
            }
            return true;
        }),

    validationMiddleware
];

const updateLiquidationValidation = [
    body('current_debt')
        .optional()
        .isDecimal({ decimal_digits: '0,2' }).withMessage('The current debt must have up to 2 decimal places')
        .custom((value) => {
            const num = parseFloat(value);
            if (num < 0) {
                throw new Error('The current debt cannot be negative');
            }
            if (num >= 100000000) {
                throw new Error('The current debt exceeds maximum allowed value');
            }
            return true;
        })
        .toFloat(),

    body('status')
        .optional()
        .isBoolean().withMessage('The status must be a boolean')
        .toBoolean(),

    body('id_shopping')
        .not()
        .exists()
        .withMessage('Cannot update shopping association'),

    validationMiddleware
];

const validateDepositsStatus = async (liquidationId) => {
    const deposits = await DepositModel.findAll({
        where: { id_liquidation: liquidationId }
    });

    const totalDeposits = deposits.reduce((sum, deposit) => 
        sum + parseFloat(deposit.amount), 0
    );

    const liquidation = await LiquidationModel.findByPk(liquidationId);
    return totalDeposits >= parseFloat(liquidation.current_debt);
};

const validateLiquidationClose = async (req, res, next) => {
    try {
        const { id } = req.params;
        const isFullyPaid = await validateDepositsStatus(id);
        
        if (!isFullyPaid) {
            return res.status(400).json({
                message: 'Cannot close liquidation: current debt not fully covered by deposits'
            });
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    liquidationValidation,
    updateLiquidationValidation,
    validateLiquidationClose
};