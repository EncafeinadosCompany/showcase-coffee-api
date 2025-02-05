const express = require('express');
const ProductController  = require('../../controllers/products/products.controller');

const router = express.Router();

const ProductRepository = require('../../repositories/products/products.repository')
const AttributeProductsRepository = require('../../repositories/products/attributesProducts.repository')
const AttributeRepository = require('../../repositories/products/attributes.repository')
const ProductService = require('../../services/products/products.service')


const productRepository = new ProductRepository();
const attributeProductsRepository = new AttributeProductsRepository();
const attributeRepository = new AttributeRepository();
const productService = new ProductService(productRepository, attributeProductsRepository, attributeRepository);
const productController = new ProductController(productService);

    router
        .get('/', (req, res) => productController.getAll(req, res))
        .get('/:id', (req, res) => productController.getById(req, res))
        .post('/', (req, res) => productController.create(req, res))

module.exports = router;