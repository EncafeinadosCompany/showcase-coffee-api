const express = require('express');
const router = express.Router();

const { ProviderRepository } = require('../../repositories/providers/provider.repository');
const { ProviderService } = require('../../services/providers/provider.service');
const { ProviderController } = require('../../controllers/providers/provider.controller');

const providerRepository = new ProviderRepository();
const providerService = new ProviderService(providerRepository);
const providerController = new ProviderController(providerService);

/**
 * @swagger
 * /providers:
 *   post:
 *     summary: Creates a new provider.
 *     description: Creates a new provider.
 *     responses:
 *       201:
 *         description: Creates a new provider.
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *            properties:
 *             name:
 *              type: string
 *             nit:
 *              type: string
  *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
router.post('/', (req, res) => providerController.createProvider(req, res));

router.get('/', (req, res) => providerController.getAllProviders(req, res));

router.get('/:id', (req, res) => providerController.getProviderById(req, res));


module.exports =  router ;