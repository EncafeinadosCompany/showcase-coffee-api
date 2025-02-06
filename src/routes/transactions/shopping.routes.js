const express = require('express');

const ShoppingRepository = require('../../repositories/transactions/shoppings.repository');
const ShoppingVariantRepository = require('../../repositories/transactions/shoppingVariant.repository');
const VariantRepository = require('../../repositories/products/variant.repository');
const {sequelize} = require('../../config/connection');
const ShoppingService = require('../../services/transactions/shopping.service');
const ShoppingController  = require('../../controllers/transactions/shopping.controller');

const shoppingRepository = new ShoppingRepository()
const shoppingVariantRepository= new ShoppingVariantRepository()
const productVariantsRepository = new VariantRepository()
const shoppingService= new ShoppingService(shoppingRepository, shoppingVariantRepository, productVariantsRepository, sequelize)
const shoppingController = new ShoppingController(shoppingService)

const router = express.Router();

router
    .get('/', (req, res) => shoppingController.getAllShopping(req, res))
    .get('/shopping-variants', (req, res) => shoppingController.getAllShoppingVariant(req, res))
    .get('/shopping-variants/:id', (req, res) => shoppingController.getShoppingVariantById(req, res))
    .get('/:id', (req, res) => shoppingController.getShoppingById(req, res))
    .post('/', (req, res) => shoppingController.createShopping(req, res));

module.exports = router;