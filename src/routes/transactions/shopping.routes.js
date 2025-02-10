const express = require('express');

const ShoppingRepository = require('../../repositories/transactions/shoppings.repository');
const ShoppingVariantRepository = require('../../repositories/transactions/shoppingVariant.repository');
const VariantRepository = require('../../repositories/products/variant.repository');
const { sequelize } = require('../../config/connection');
const ShoppingService = require('../../services/transactions/shopping.service');
const ShoppingController  = require('../../controllers/transactions/shopping.controller');
const shoppingValidation = require('../../middlewares/shopping/Validation/shopping.validation');
const errorMessages = require('../../middlewares/shopping/translations/errorMesaggeShopping');
const validationMiddleware = require('../../middlewares/validateRequest');

const shoppingRepository = new ShoppingRepository();
const shoppingVariantRepository = new ShoppingVariantRepository();
const productVariantsRepository = new VariantRepository();
const shoppingService = new ShoppingService(shoppingRepository, shoppingVariantRepository, productVariantsRepository, sequelize);
const shoppingController = new ShoppingController(shoppingService);

const router = express.Router();

router
  .get('/', shoppingController.getAllShopping.bind(shoppingController))
  .get('/shopping-variants', shoppingController.getAllShoppingVariant.bind(shoppingController))
  .get('/shopping-variants/:id', shoppingController.getShoppingVariantById.bind(shoppingController))
  .get('/:id', shoppingController.getShoppingById.bind(shoppingController))
  .post(
    '/', 
    shoppingValidation, 
    validationMiddleware, 
    shoppingController.createShopping.bind(shoppingController)
  );

module.exports = router;