const { body } = require("express-validator");

const variantProductValidation = [
  body("grammage")
    .notEmpty().withMessage("Grammage is required")
    .isLength({ min: 1, max: 10 }).withMessage("Grammage must be between 1 and 10 characters"),

  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage("Stock must be an integer greater than or equal to 0"),

  body("id_product")
    .notEmpty().withMessage("Product ID is required")
    .isInt().withMessage("Product ID must be an integer"),
];

module.exports = variantProductValidation;
