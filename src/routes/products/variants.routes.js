const express = require('express');


// middleware
const variantValidation = require('../../middlewares/products/Validations/variant.validation');

const router = express.Router();

const VariantController  = require('../../controllers/products/variants.controller');
const VariantRepository = require('../../repositories/products/variant.repository')
const VariantService = require("../../services/products/variants.service");
const { authenticateJWT } = require('../../middlewares/auth.middleware');

const variantRepository = new VariantRepository();
const variantService = new VariantService(variantRepository);
const variantController = new VariantController(variantService);

    router
        .get('/', authenticateJWT, (req, res) => variantController.getAll(req, res))
        .get('/:id', authenticateJWT, (req, res) => variantController.getById(req, res))
        .post('/', authenticateJWT, variantValidation, (req, res) => variantController.create(req, res));

module.exports = router ;