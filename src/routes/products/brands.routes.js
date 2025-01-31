const express = require('express');
const BrandController  = require('../../controllers/products/brands.controller');

const router = express.Router();
const brandController = new BrandController();

router.get('/', (req, res) => brandController.getAll(req, res));
router.get('/:id', (req, res) => brandController.getById(req, res));
router.post('/', (req, res) => brandController.create(req, res));

module.exports = router;