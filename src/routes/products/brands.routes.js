const express = require('express');


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
        .post('/', (req, res) => brandController.create(req, res))

module.exports = router;