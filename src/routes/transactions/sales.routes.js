const { sequelize } = require('../../config/connection');

const SalesService = require('../../services/transactions/sales.service');
const SalesController  = require('../../controllers/transactions/sales.controller');
const SalesRepository = require('../../repositories/transactions/sales.repository');
const SalesVariantRepository = require('../../repositories/transactions/salesVariant.repository');
const ShoppingRepository = require('../../repositories/transactions/shopping.repository');
const VariantRepository = require('../../repositories/products/variant.repository');
const LiquidationService = require('../../services/payments/liquidation.service');
const LiquidationRepository = require('../../repositories/payments/liquidation.repository');

const saleVariantRepository = new SalesVariantRepository();
const shoppingRepository = new ShoppingRepository();
const liquidationRepository = new LiquidationRepository();
const liquidationService = new LiquidationService(liquidationRepository);
const variantRepository = new VariantRepository();

const saleRepository = new SalesRepository();
const saleService = new SalesService(saleRepository, variantRepository, shoppingRepository, saleVariantRepository, liquidationService, sequelize);
const saleController = new SalesController(saleService);

const { authenticateJWT } = require('../../middlewares/auth.middleware');

const router = require('express').Router();

router
    .get('/', authenticateJWT, (req, res) => saleController.getAllSales(req, res))
    .get('/:id', authenticateJWT, (req, res) => saleController.getSaleById(req, res))
    .post('/', authenticateJWT, (req, res) => saleController.createSale(req, res))

module.exports = router ;