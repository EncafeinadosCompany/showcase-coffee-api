const express = require('express');
const DepositController = require('../../controllers/payments/deposit.controller');

const router = express.Router();
const depositController = new DepositController();

router.get('/', (req, res) => DepositController.getAllDeposits(req, res));
router.get('/:id', (req, res) => DepositController.getDepositById(req, res));
router.post('/', (req, res) =>  DepositController.createDeposit(req, res));
router.get('/by-liquidation/:liquidationId', (req, res) => DepositController.getDepositsByLiquidation(req, res));

module.exports = router;
