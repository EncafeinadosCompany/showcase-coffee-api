const express = require('express');
const LiquidationController = require('../../controllers/payments/liquidation.controller');

const router = express.Router();
const liquidationController = new LiquidationController();

router.get('/', (req, res) => liquidationController.getAllLiquidations(req, res));
router.get('/:id', (req, res) => liquidationController.getLiquidationById(req, res));
router.post('/', (req, res) => liquidationController.createLiquidation(req, res));
router.get('/:id/with-deposits', (req, res) => liquidationController.getLiquidationWithDeposits(req, res));

module.exports = router;
