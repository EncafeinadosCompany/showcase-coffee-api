const express = require('express');
const AttributesController  = require('../../controllers/products/attributes.controller');

const router = express.Router();
const attributesController = new AttributesController();

router.get('/', (req, res) => attributesController.getAllAttributes(req, res));
router.get('/:id', (req, res) => attributesController.getAttributesID(req, res));
router.post('/', (req, res) => attributesController.createAttribute(req, res));

module.exports = router;