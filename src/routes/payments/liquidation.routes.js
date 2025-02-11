const express = require('express');
const LiquidationController = require('../../controllers/payments/liquidation.controller');
const LiquidationRepository = require('../../repositories/payments/liquidation.repository');
const LiquidationService = require('../../services/payments/liquidation.service');
const { authenticateJWT } = require('../../middlewares/auth.middleware');

const liquidationRepository = new LiquidationRepository();
const liquidationService = new LiquidationService(liquidationRepository);
const liquidationController = new LiquidationController(liquidationService);

const router = require('express').Router();

router
    .get('/', authenticateJWT, (req, res) => liquidationController.getAllLiquidations(req, res))
    .get('/:id', authenticateJWT, (req, res) => liquidationController.getLiquidationById(req, res))
    .post('/', authenticateJWT, (req, res) => liquidationController.createLiquidation(req, res))
    .get('/:id/with-deposits', authenticateJWT, (req, res) => liquidationController.getLiquidationWithDeposits(req, res))

module.exports = router;
