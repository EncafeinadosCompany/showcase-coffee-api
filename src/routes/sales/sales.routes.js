const express = require('express');
const SalesController  = require('../../controllers/sales/sales.controller');

const router = express.Router();
const salesController = new SalesController();

router.get('/', (req, res) => salesController.getAllSales(req, res));
router.get('/:id', (req, res) => salesController.getSalesById(req, res));
router.post('/', (req, res) => salesController.createSaleWithDetails(req, res));
router.get('/variant/all', (req, res) => salesController.getAllSaleVariant(req, res));
router.get('/variant/:id', (req, res) => salesController.getSaleVariantById(req, res));

module.exports = router ;