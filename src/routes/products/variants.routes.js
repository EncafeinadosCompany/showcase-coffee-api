const express = require('express');
const VariantController  = require('../../controllers/products/variants.controller');

const router = express.Router();
const variantController = new VariantController();

router.get('/', (req, res) => variantController.getAll(req, res));
router.get('/:id', (req, res) => variantController.getById(req, res));
router.post('/', (req, res) => variantController.create(req, res));

module.exports = router ;