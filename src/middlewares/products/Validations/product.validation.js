const { body } = require("express-validator");

const productValidation = [
  body("name")
    .notEmpty().withMessage("The product name is required")
    .isLength({ min: 1, max: 50 }).withMessage("The product name must be between 1 and 50 characters"),
  
  body("status")
    .optional()
    .isBoolean().withMessage("Status must be a boolean value"),

  body("id_brand")
    .notEmpty().withMessage("Brand is required")
    .isInt().withMessage("Brand ID must be an integer"),
];


module.exports = productValidation
