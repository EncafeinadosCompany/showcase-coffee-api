const express = require('express');

// Middleware
const brandValidation = require('../../middlewares/products/Validations/brand.validation');
const errorMessages = require('../../middlewares/products/translations/errorMesaggesBrand');
const validationMiddleware = require('../../middlewares/validateRequest');

const router = express.Router();

const BrandController  = require('../../controllers/products/brands.controller');
const BrandRepository = require('../../repositories/products/blands.repository')
const BrandService = require('../../services/products/brands.service')

const brandRepository = new BrandRepository();
const brandService = new BrandService(brandRepository);
const brandController = new BrandController(brandService);

    router
        .get('/', (req, res) => brandController.getAll(req, res))
        .get('/:id', (req, res) => brandController.getById(req, res))
        .post('/',
            brandValidation,
            validationMiddleware,
            brandController.create.bind(brandController)
        );
        
module.exports = router;