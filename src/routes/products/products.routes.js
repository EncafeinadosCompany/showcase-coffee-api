const express = require('express');

// Middleware
const productValidation = require('../../middlewares/products/Validations/product.validation');

const router = express.Router();

const ProductRepository = require('../../repositories/products/products.repository')
const ProductController = require('../../controllers/products/products.controller');
const AttributeProductsRepository = require('../../repositories/products/attributesProducts.repository')
const AttributeRepository = require('../../repositories/products/attributes.repository')
const ProductService = require('../../services/products/products.service');
const { authenticateJWT } = require('../../middlewares/auth.middleware');

const productRepository = new ProductRepository();
const attributeProductsRepository = new AttributeProductsRepository();
const attributeRepository = new AttributeRepository();
const productService = new ProductService(productRepository, attributeProductsRepository, attributeRepository);
const productController = new ProductController(productService);

router
    .get('/', authenticateJWT, (req, res) => productController.getAll(req, res))
    .get('/:id', authenticateJWT, (req, res) => productController.getById(req, res))
    .post('/', authenticateJWT, productValidation, (req, res) => productController.create(req, res))
    .put('/:id', productValidation, (req, res) => productController.updateProduct(req, res));

module.exports = router;