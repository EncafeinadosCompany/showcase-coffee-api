const express = require('express');
const router = express.Router();

const { ProviderRepository } = require('../../repositories/providers/provider.repository');
const { ProviderService } = require('../../services/providers/provider.service');
const { ProviderController } = require('../../controllers/providers/provider.controller');

const providerRepository = new ProviderRepository();
const providerService = new ProviderService(providerRepository);
const providerController = new ProviderController(providerService);

router
    .post('/', (req, res) => providerController.createProvider(req, res))
    .get('/', (req, res) => providerController.getAllProviders(req, res))
    .get('/:id', (req, res) => providerController.getProviderById(req, res))

module.exports =  router ;