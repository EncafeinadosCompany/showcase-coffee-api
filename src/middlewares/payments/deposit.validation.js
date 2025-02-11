const { body } = require('express-validator');
const validationMiddleware = require('../../validateRequest');
const { idValidation } = require('../validationRules');

const depositValidation = [
    body('id_liquidation')
        .custom(idValidation('id_liquidation'))
        .custom(async (value, { req }) => {
            const liquidation = await LiquidationModel.findByPk(value);
            if (!liquidation) {
                throw new Error('Liquidation not found');
            }
            return true;
        }),

    body('date').custom((value) => {
            const depositDate = new Date(value);
            const today = new Date();
            if (depositDate > today) {
                throw new Error('Deposit date cannot be in the future');
            }
            return true;
        }),

    body('amount')
        .notEmpty().withMessage('The amount is required')
        .isDecimal({ decimal_digits: '0,2' }).withMessage('The amount must have up to 2 decimal places')
        .custom((value) => {
            const num = parseFloat(value);
            if (num <= 0) {
                throw new Error('The amount must be greater than 0');
            }
            return true;
        })
        .toFloat(),

    body('type_payment')
        .notEmpty().withMessage('The type_payment is required')
        .isLength({ min: 1, max: 20 }).withMessage('The type_payment must be between 1 and 20 characters')
        .isIn(['cash', 'transfer', 'card']).withMessage('Invalid payment type')
        .trim(),

    body('voucher')
        .notEmpty().withMessage('The voucher is required')
        .isLength({ min: 1, max: 200 }).withMessage('The voucher must be between 1 and 200 characters')
        .matches(/^[a-zA-Z0-9-_\.]+$/).withMessage('The voucher contains invalid characters')
        .trim(),

    validationMiddleware
];

module.exports = {depositValidation,};