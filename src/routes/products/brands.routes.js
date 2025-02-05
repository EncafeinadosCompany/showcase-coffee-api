const express = require('express');


const router = express.Router();

const BrandController  = require('../../controllers/products/brands.controller');


const brandController = new BrandController();

router.get('/', (req, res) => brandController.getAll(req, res));
router.get('/:id', (req, res) => brandController.getById(req, res));
router.post('/', (req, res) => brandController.create(req, res));

module.exports = router;