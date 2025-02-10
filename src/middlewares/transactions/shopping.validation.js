// validators/shoppingValidator.js

const { body } = require('express-validator');

const shoppingValidation = [
  body('shopping').isObject().withMessage('Shopping must be an object'),

  body('shopping.id_store')
    .exists().withMessage('Store ID is required')
    .isInt({ gt: 0 }).withMessage('Store ID must be a positive integer'),

  body('shopping.id_employee')
    .exists().withMessage('Employee ID is required')
    .isInt({ gt: 0 }).withMessage('Employee ID must be a positive integer'),

  body('shopping.date_entry')
    .exists().withMessage('Date entry is required')
    .isISO8601().withMessage('Date entry must be a valid ISO 8601 date'),

  body('details')
    .isArray({ min: 1 }).withMessage('Details must be an array with at least one item'),

  body('details.*').custom((detail, { req }) => {
    if (typeof detail !== 'object') {
      throw new Error('Each detail must be an object');
    }
    return true;
  }),

  body('details.*.id_variant_products')
    .exists().withMessage('Variant product ID is required')
    .isInt({ gt: 0 }).withMessage('Variant product ID must be a positive integer'),

  body('details.*.roasting_date')
    .exists().withMessage('Roasting date is required')
    .isISO8601().withMessage('Roasting date must be a valid ISO 8601 date')
    .custom((value) => {
      const roastingDate = new Date(value);
      const currentDate = new Date();
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(currentDate.getMonth() - 1);

      if (roastingDate < oneMonthAgo) {
        throw new Error('Roasting date cannot be older than one month');
      }
      if (roastingDate > currentDate) {
        throw new Error('Roasting date cannot be in the future');
      }
      return true;
    }),

  body('details.*.quantity')
    .exists().withMessage('Quantity is required')
    .isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),

  body('details.*.shopping_price')
    .exists().withMessage('Shopping price is required')
    .isFloat({ gt: 0 }).withMessage('Shopping price must be a positive number'),

  body('details.*.sale_price')
    .exists().withMessage('Sale price is required')
    .isFloat({ gt: 0 }).withMessage('Sale price must be a positive number'),
];

module.exports = shoppingValidation;
