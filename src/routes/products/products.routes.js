const express = require('express');
const ProductController  = require('../../controllers/products/products.controller');

const router = express.Router();
const productController = new ProductController();

router.get('/', (req, res) => productController.getAll(req, res));
router.get('/:id', (req, res) => productController.getById(req, res));
router.post('/', (req, res) => productController.create(req, res));

module.exports = router;