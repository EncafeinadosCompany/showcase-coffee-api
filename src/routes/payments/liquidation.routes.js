const express = require('express');
const LiquidationController = require('../../controllers/payments/liquidation.controller');
const LiquidationRepository = require('../../repositories/payments/liquidation.repository');
const LiquidationService = require('../../services/payments/liquidation.service');

const LiquidationRepository = new LiquidationRepository();
const liquidationController = new LiquidationController(LiquidationRepository);
const liquidationService = new LiquidationService(LiquidationRepository);

const router = express.Router();

router.get('/', (req, res) => liquidationController.getAllLiquidations(req, res));
router.get('/:id', (req, res) => liquidationController.getLiquidationById(req, res));
router.post('/', (req, res) => liquidationController.createLiquidation(req, res));
router.get('/:id/with-deposits', (req, res) => liquidationController.getLiquidationWithDeposits(req, res));

module.exports = router;
