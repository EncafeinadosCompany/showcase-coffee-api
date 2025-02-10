const { body } = require("express-validator");

const attributeValidation = [
  body("description")
    .notEmpty().withMessage("The description is required")
    .isLength({ min: 1, max: 100 }).withMessage("The description must be between 1 and 100 characters"),
];




module.exports = attributeValidation;
