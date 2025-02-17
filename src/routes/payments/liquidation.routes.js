const LiquidationRepository = require('../../repositories/payments/liquidation.repository');
const LiquidationController = require('../../controllers/payments/liquidation.controller');
const LiquidationService = require('../../services/payments/liquidation.service');

const { authenticateJWT } = require('../../middlewares/auth.middleware');

const liquidationRepository = new LiquidationRepository();
const liquidationService = new LiquidationService(liquidationRepository);
const liquidationController = new LiquidationController(liquidationService);

const router = require('express').Router();

router
    .get('/', authenticateJWT, (req, res) => liquidationController.getAllLiquidations(req, res))
    .get('/:id', authenticateJWT, (req, res) => liquidationController.getLiquidationById(req, res))
    .get('/details/:liquidationId', authenticateJWT, (req, res) => liquidationController.getLiquidationDetails(req, res))
    .post('/', authenticateJWT, (req, res) => liquidationController.createLiquidation(req, res))

module.exports = router;
