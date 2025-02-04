const express = require('express');

const DepositController = require('../../controllers/payments/deposit.controller');
const DepositRepository = require('../../repositories/payments/deposit.repository');
const DepositService = require('../../services/payments/deposit.service');

const depositRepository = new DepositRepository();
const depositService = new DepositService(depositRepository);
const depositController = new DepositController(depositService);

const router = express.Router();

router.get('/', (req, res) => depositController.getAllDeposits(req, res));
router.get('/:id', (req, res) => depositController.getDepositById(req, res));
router.post('/', (req, res) =>  depositController.createDeposit(req, res));
router.get('/by-liquidation/:liquidationId', (req, res) => depositController.getDepositsByLiquidation(req, res));

module.exports = router;
