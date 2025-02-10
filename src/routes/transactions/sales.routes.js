const { sequelize } = require('../../config/connection');

const SalesService = require('../../services/transactions/sales.service');
const SalesController  = require('../../controllers/transactions/sales.controller');
const SalesRepository = require('../../repositories/transactions/sales.repository');
const SalesVariantRepository = require('../../repositories/transactions/salesVariant.repository');
const ShoppingVariantRepository = require('../../repositories/transactions/shoppingVariant.repository');
const VariantRepository = require('../../repositories/products/variant.repository');

const saleVariantRepository = new SalesVariantRepository();
const shoppingRepository = new ShoppingVariantRepository();
const variantRepository = new VariantRepository();

const saleRepository = new SalesRepository();
const saleService = new SalesService(saleRepository, variantRepository, shoppingRepository, saleVariantRepository, sequelize);
const saleController = new SalesController(saleService);

const { authenticateJWT } = require('../../middlewares/auth.middleware');

const router = require('express').Router();

router
    .get('/', authenticateJWT, (req, res) => saleController.getAllSales(req, res))
    .get('/:id', authenticateJWT, (req, res) => saleController.getSaleById(req, res))
    .post('/', authenticateJWT, (req, res) => saleController.createSale(req, res))

module.exports = router ;