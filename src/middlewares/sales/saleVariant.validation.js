const { body } = require('express-validator');
const validationMiddleware = require('../validateRequest');
const { idValidation, quantityValidation } = require('../validationRules');

const saleVariantValidation = [
    idValidation('id_sale'),

    idValidation('id_variant_products'),

    quantityValidation('quantity'),

    body('subtotal')
        .optional()
        .isFloat({ min: 0 }).withMessage('Subtotal must be a positive number'),

    validationMiddleware
];

module.exports = saleVariantValidation;
