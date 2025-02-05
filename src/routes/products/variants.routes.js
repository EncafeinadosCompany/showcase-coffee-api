const express = require('express');
const VariantController  = require('../../controllers/products/variants.controller');
const VariantRepository = require('../../repositories/products/variant.repository')
const VariantService = require("../../services/products/variants.service");


const variantRepository = new VariantRepository();
const variantService = new VariantService(variantRepository);
const variantController = new VariantController(variantService);

const router = express.Router();

    router
        .get('/', (req, res) => variantController.getAll(req, res))
        .get('/:id', (req, res) => variantController.getById(req, res))
        .post('/', (req, res) => variantController.create(req, res))

module.exports = router ;