const express = require('express');
const DepositController = require('../../controllers/payments/deposit.controller');

const router = express.Router();
const depositController = new DepositController();

router.get('/', (req, res) => depositController.getAllDeposits(req, res));
router.get('/:id', (req, res) => depositController.getDepositById(req, res));
router.post('/', (req, res) =>  depositController.createDeposit(req, res));
router.get('/by-liquidation/:liquidationId', (req, res) => depositController.getDepositsByLiquidation(req, res));

module.exports = router;
