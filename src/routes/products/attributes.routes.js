const express = require('express');


const router = express.Router();

const AttributesRepository = require('../../repositories/products/attributes.repository');
const AttributeService = require('../../services/products/attributes.service');
const AttributesController  = require('../../controllers/products/attributes.controller');
const AttributeProductsRepository = require('../../repositories/products/attributesProducts.repository'); 

const attributeProductsRepository = new AttributeProductsRepository();
const attributesRepository = new AttributesRepository();
const attributeService = new AttributeService(attributeProductsRepository,attributesRepository);
const attributesController = new AttributesController(attributeService);

    router
        .get('/', (req, res) => attributesController.getAllAttributes(req, res))
        .get('/:id', (req, res) => attributesController.getAttributesID(req, res))
        .post('/', (req, res) => attributesController.createAttribute(req, res))

module.exports = router;