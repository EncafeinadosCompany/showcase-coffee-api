const express = require ('express')

const ProductsRepository = require('../../repositories/products/products.repository')

const ProductController = require('../../controllers/products/products.controller')

const ProductService = require('../../controllers/products/products.controller')

const router = express.Router();

const productsRepository = new ProductsRepository();

const productService = new ProductService(productsRepository)

const productController = new ProductController(productService)

router.get('/', productController.create);


module.exports = router;