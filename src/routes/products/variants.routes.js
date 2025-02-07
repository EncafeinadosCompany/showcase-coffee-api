const express = require('express');


// middleware
const variantValidation = require('../../middlewares/products/Validations/variant.validation');
const errorMessages = require('../../middlewares/products/translations/errorMesaggesVariant');
const validationMiddleware = require('../../middlewares/validateRequest');


const router = express.Router();

const VariantController  = require('../../controllers/products/variants.controller');
const VariantRepository = require('../../repositories/products/variant.repository')
const VariantService = require("../../services/products/variants.service");

const variantRepository = new VariantRepository();
const variantService = new VariantService(variantRepository);
const variantController = new VariantController(variantService);

    router
        .get('/', (req, res) => variantController.getAll(req, res))
        .get('/:id', (req, res) => variantController.getById(req, res))
        .post('/', 
            variantValidation,
            validationMiddleware(errorMessages),
            variantController.create.bind(variantController)
        );

module.exports = router ;