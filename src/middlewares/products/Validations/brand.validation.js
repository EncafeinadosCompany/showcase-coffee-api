const { body } = require("express-validator");

const brandValidation = [
  body("name")
    .notEmpty().withMessage("The brand name is required")
    .isLength({ min: 1, max: 100 }).withMessage("The brand name must be between 1 and 100 characters"),

  body("description")
    .optional()
    .isLength({ max: 150 }).withMessage("The description must be up to 150 characters"),
];

module.exports = brandValidation;
