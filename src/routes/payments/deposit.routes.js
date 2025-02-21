const express = require('express');

const DepositController = require('../../controllers/payments/deposit.controller');
const DepositRepository = require('../../repositories/payments/deposit.repository');
const DepositService = require('../../services/payments/deposit.service');
const LiquidationRepository = require('../../repositories/payments/liquidation.repository');
const { sequelize } = require('../../config/connection');

const { authenticateJWT } = require('../../middlewares/auth.middleware');

const depositRepository = new DepositRepository();
const liquidationRepository = new LiquidationRepository();
const depositService = new DepositService(depositRepository, liquidationRepository, sequelize);
const depositController = new DepositController(depositService);

const router = require('express').Router();

router
    .get('/', authenticateJWT, (req, res) => depositController.getAllDeposits(req, res))
    .get('/:id', authenticateJWT, (req, res) => depositController.getDepositById(req, res))
    .post('/', authenticateJWT, (req, res) =>  depositController.createDeposit(req, res))
    .get('/by-liquidation/:liquidationId', authenticateJWT, (req, res) => depositController.getDepositsByLiquidation(req, res))
    .get('/total-by-liquidation/:liquidationId', authenticateJWT, (req, res) => depositController.getTotalDepositsByLiquidation(req, res));

module.exports = router;
