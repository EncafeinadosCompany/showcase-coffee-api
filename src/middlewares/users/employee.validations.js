const { nameValidation, phoneValidation, emailValidation, idValidation } = require('../validationRules');
const validationMiddleware = require('../validateRequest');
const { body } = require('express-validator');

const employeeValidation = [

    idValidation('id_user'),

    body('identification')
        .matches(/^[0-9]{5,10}$/).withMessage('Identification must be a number with 5 to 10 digits'),

    nameValidation('name'),

    nameValidation('last_name'),

    phoneValidation('phone'),

    emailValidation('email'),

    body('type')
        .notEmpty().withMessage('Type is required')
        .isIn(['store', 'provider']).withMessage('Type must be either store or provider'),

    idValidation('id_store'),

    idValidation('id_provider'),

    validationMiddleware
];

module.exports = employeeValidation;
