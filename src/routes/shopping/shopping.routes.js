const express = require('express');
const ShoppingController  = require('../../controllers/shopping/shopping.controller');

const router = express.Router();
const shoppingController = new ShoppingController();

router.get('/', (req, res) => shoppingController.getAllShopping(req, res));
router.get('/:id', (req, res) => shoppingController.getShoppingById(req, res));
router.post('/', (req, res) => shoppingController.createShopping(req, res));
router.get('/variant/all', (req, res) => shoppingController.getAllShoppingVariant(req, res));
router.get('/variant/:id', (req, res) => shoppingController.getShoppingVariantById(req, res));

module.exports = router ;