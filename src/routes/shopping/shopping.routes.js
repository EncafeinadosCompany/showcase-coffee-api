const express = require('express');
const ShoppingController  = require('../../controllers/shopping/shopping.controller');

const router = express.Router();
const shoppingController = new ShoppingController();

router.get('/', (req, res) => shoppingController.getAll(req, res));
router.get('/:id', (req, res) => shoppingController.getById(req, res));
router.post('/', (req, res) => shoppingController.create(req, res));

module.exports = router ;