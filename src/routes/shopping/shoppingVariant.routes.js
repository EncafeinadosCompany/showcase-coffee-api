const express = require('express');
const ShoppingVariantController  = require('../../controllers/shopping/shoppingVariants.controller');

const router = express.Router();
const shoppingVariantController = new ShoppingVariantController();

router.get('/', (req, res) => shoppingVariantController.getAllShoppingVariant(req, res));
router.get('/:id', (req, res) => shoppingVariantController.getShoppingVariantById(req, res));

module.exports = router;