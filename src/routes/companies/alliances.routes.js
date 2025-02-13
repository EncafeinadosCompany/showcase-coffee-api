const router = require('express').Router();

const { AllianceRepository } = require('../../repositories/companies/alliances.repository');
const { AllianceController } = require('../../controllers/companies/alliances.controller');
const { AllianceService } = require('../../services/companies/alliances.services');

const LiquidationRepository = require('../../repositories/payments/liquidation.repository');
const LiquidationService = require('../../services/payments/liquidation.service');

const { authenticateJWT } = require('../../middlewares/auth.middleware');

const liquidationRepository = new LiquidationRepository();
const liquidationService = new LiquidationService(liquidationRepository);

const allianceRepository = new AllianceRepository();
const allianceService = new AllianceService(allianceRepository, liquidationService);
const allianceController = new AllianceController(allianceService);

router
  .post("/",authenticateJWT, (req, res) => allianceController.addAlliance(req, res))
  .get("/store/:storeId",authenticateJWT, (req, res) => allianceController.getProvidersByStore(req, res))
  .get("/provider/:providerId",authenticateJWT, (req, res) => allianceController.getStoresByProvider(req, res));

module.exports = router;