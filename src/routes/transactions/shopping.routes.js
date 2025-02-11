const express = require('express');

const ShoppingRepository = require('../../repositories/transactions/shopping.repository');
const ShoppingVariantRepository = require('../../repositories/transactions/shoppingVariant.repository');
const VariantRepository = require('../../repositories/products/variant.repository');
const { sequelize } = require('../../config/connection');
const ShoppingService = require('../../services/transactions/shopping.service');
const ShoppingController  = require('../../controllers/transactions/shopping.controller');
const shoppingValidation = require('../../middlewares/transactions/shopping.validation');

const shoppingRepository = new ShoppingRepository();
const shoppingVariantRepository = new ShoppingVariantRepository();
const productVariantsRepository = new VariantRepository();
const shoppingService = new ShoppingService(shoppingRepository, shoppingVariantRepository, productVariantsRepository, sequelize);
const shoppingController = new ShoppingController(shoppingService);

const { authenticateJWT } = require('../../middlewares/auth.middleware');

const router = express.Router();

router
  .get('/', authenticateJWT, (req, res) => shoppingController.getAllShopping(req, res))
  .get('/shopping-variants', authenticateJWT, (req, res) => shoppingController.getAllShoppingVariant(req, res))
  .get('/shopping-variants/:id', authenticateJWT, (req, res) => shoppingController.getShoppingVariantById(req, res))
  .get('/:id', authenticateJWT, (req, res) => shoppingController.getShoppingById(req, res))
  .post('/', authenticateJWT, shoppingValidation, (req, res) => shoppingController.createShopping(req, res)
  );

module.exports = router;