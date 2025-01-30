const express = require('express');
const LiquidationController = require('../../controllers/payments/liquidation.controller');

const router = express.Router();
const liquidationController = new LiquidationController();

router.get('/', (req, res) => LiquidationController.getAllLiquidations(req, res));
router.get('/:id', (req, res) => LiquidationController.getLiquidationById(req, res));
router.post('/', (req, res) => LiquidationController.createLiquidation(req, res));
router.get('/:id/with-deposits', (req, res) => LiquidationController.getLiquidationWithDeposits(req, res));

module.exports = router;
