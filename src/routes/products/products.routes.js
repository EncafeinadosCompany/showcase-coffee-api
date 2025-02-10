const express = require('express');

// Middleware
const productValidation = require('../../middlewares/products/Validations/product.validation');
const errorMessages = require('../../middlewares/products/translations/errorMesaggesProduct');
const validationMiddleware = require('../../middlewares/validateRequest');

const router = express.Router();

const ProductRepository = require('../../repositories/products/products.repository')
const ProductController  = require('../../controllers/products/products.controller');
const AttributeProductsRepository = require('../../repositories/products/attributesProducts.repository')
const AttributeRepository = require('../../repositories/products/attributes.repository')
const ProductService = require('../../services/products/products.service');

const productRepository = new ProductRepository();
const attributeProductsRepository = new AttributeProductsRepository();
const attributeRepository = new AttributeRepository();
const productService = new ProductService(productRepository, attributeProductsRepository, attributeRepository);
const productController = new ProductController(productService);

    router
        .get('/', (req, res) =>  productController.getAll(req, res))
        .get('/:id', (req, res) => productController.getById(req, res))
        .post('/', 
            productValidation, 
            validationMiddleware, 
            productController.create.bind(productController)
        );

module.exports = router;