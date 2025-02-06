const router = require('express').Router();

const { ProviderRepository } = require('../../repositories/companies/provider.repository');
const { ProviderController } = require('../../controllers/companies/provider.controller');
const { ProviderService } = require('../../services/companies/provider.service');

const { authenticateJWT } = require('../../middlewares/auth.middleware');

const providerRepository = new ProviderRepository();
const providerService = new ProviderService(providerRepository);
const providerController = new ProviderController(providerService);

router
    .post('/', (req, res) => providerController.createProvider(req, res))
    .get('/', (req, res) => providerController.getAllProviders(req, res))
    .get('/:id', (req, res) => providerController.getProviderById(req, res));

module.exports =  router ;