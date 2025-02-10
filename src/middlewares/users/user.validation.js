const { body } = require('express-validator');
const validationMiddleware = require('../validateRequest');

const userValidation = [
    body('id_role')
        .notEmpty().withMessage('Role is required'),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is invalid'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min:6, max:16 }).withMessage('Password must be at least 6 characters and at most 16 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),

    validationMiddleware
];

module.exports = userValidation;