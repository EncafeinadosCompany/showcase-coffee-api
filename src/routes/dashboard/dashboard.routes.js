const DashboardController = require('../../controllers/dashboard/dashboard.controller');
const DashboardService = require ('../../services/dashboard/dashboard.service.js');
const SalesVariantRepository = require('../../repositories/transactions/salesVariant.repository');
const ShoppingVariantRepository = require('../../repositories/transactions/shoppingVariant.repository.js');
const DepositRepository = require('../../repositories/payments/deposit.repository');
const LiquidationRepository = require('../../repositories/payments/liquidation.repository');
const BrandsRepository = require('../../repositories/products/blands.repository.js');

const router = require ('express').Router();
const { authenticateJWT } = require('../../middlewares/auth.middleware');

const depositRepository = new DepositRepository();
const liquidationRepository = new LiquidationRepository();
const salesVariantRepository= new SalesVariantRepository();
const shoppingVariantRepository= new ShoppingVariantRepository();
const brandsRepository = new BrandsRepository();

const dashboardService = new DashboardService(salesVariantRepository, shoppingVariantRepository,liquidationRepository,depositRepository,brandsRepository);
const dashboardController = new DashboardController(dashboardService); 

router 

    .post('/data-top', (req, res) => dashboardController.productTop(req, res))
    .post('/data-tostion', (req, res) => dashboardController.earlyDate(req, res))
    .post('/data-earning', (req, res) => dashboardController.earnings(req, res))
    .get('/total-liquidation',  (req, res) => dashboardController.getTotalLiquidation(req, res))
    .get('/total-deposits', (req, res) => dashboardController.getTotalDeposits(req, res))
    .get('/total-brands', (req, res) => dashboardController.getTotalBrands(req, res))
    .post('/total-sales-month', (req, res) => dashboardController.getTotalSalesByMonth(req, res)) 
    .post('/total-sales-year', (req, res) => dashboardController.getTotalSalesByYear(req, res))
    .post('/sales-count-month', (req, res) => dashboardController.getSalesCountByMonth(req, res))
    .post('/sales-count-year', (req, res) => dashboardController.getSalesCountByYear(req, res));

module.exports = router;