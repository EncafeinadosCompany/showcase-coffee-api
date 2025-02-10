const validationMiddleware = require("../validateRequest");
const { nameValidation } = require("../validationRules");

const validateRoles = [

    nameValidation('name'),

    validationMiddleware
];

module.exports = validateRoles;