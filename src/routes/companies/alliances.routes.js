const router = require('express').Router();

const { AllianceRepository } = require('../../repositories/companies/alliances.repository');
const { AllianceController } = require('../../controllers/companies/alliances.controller');
const { AllianceService } = require('../../services/companies/alliances.services');

const { authenticateJWT } = require('../../middlewares/auth.middleware');

const storeProviderRepository = new AllianceRepository();
const storeProviderService = new AllianceService(storeProviderRepository);
const storeProviderController = new AllianceController(storeProviderService);

router
  .post("/",authenticateJWT, (req, res) => storeProviderController.addAlliance(req, res))
  .get("/store/:storeId",authenticateJWT, (req, res) => storeProviderController.getProvidersByStore(req, res))
  .get("/provider/:providerId",authenticateJWT, (req, res) => storeProviderController.getStoresByProvider(req, res));

module.exports = router;