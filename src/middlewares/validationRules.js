const { body } = require('express-validator');

const idValidation = (field = 'id') =>
    body(field)
        .notEmpty().withMessage(`${field} is required`)
        .isInt().withMessage(`${field} must be an integer`);


const nameValidation = (field = 'name') =>
    body(field)
        .notEmpty().withMessage(`${field} is required`)
        .matches(/^[a-zA-Záéíóúñ\s]*$/).withMessage('Name must contain only letters')
        .isLength({ min: 2, max: 50 }).withMessage(`${field} must be between 2 and 50 characters`);


const phoneValidation = (field = 'phone', country = 'es-CO') =>
    body(field)
        .notEmpty().withMessage(`${field} is required`)
        .isMobilePhone(country).withMessage(`${field} must be a valid phone number`);


const emailValidation = (field = 'email') =>
    body(field)
        .normalizeEmail()
        .notEmpty().withMessage(`${field} is required`)
        .isEmail().withMessage(`${field} must be a valid email`);


const quantityValidation = (field = 'quantity') =>
    body(field)
        .notEmpty().withMessage(`${field} is required`)
        .isInt({ min: 1 }).withMessage(`${field} must  be a positive integer`);

module.exports = {
    idValidation,
    nameValidation,
    phoneValidation,
    emailValidation,
    quantityValidation,
};
