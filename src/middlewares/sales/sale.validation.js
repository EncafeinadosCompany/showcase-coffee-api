const { body } = require('express-validator');
const validationMiddleware = require('../validateRequest');

const saleValidation = [
    
    body('date')
        .optional()
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Invalid date format'),

    body('type_payment')
        .notEmpty().withMessage('Type of payment is required')
        .isIn(['Efectivo', 'Tarjeta', 'Transferencia']).withMessage('Invalid type of payment'),

    body('total')
        .optional()
        .isFloat({ min: 0 }).withMessage('Total must be a positive number'),

    validationMiddleware
];

module.exports = saleValidation;
