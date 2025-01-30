const express = require('express');
const { ProviderController } = require('../../controllers/providers/provider.controller');

const router = express.Router();
const providerController = new ProviderController();

router.post('/', (req, res) => providerController.createProvider(req, res));

router.get('/', (req, res) => providerController.getAllProviders(req, res));

router.get('/:id', (req, res) => providerController.getProviderById(req, res));


module.exports =  router ;