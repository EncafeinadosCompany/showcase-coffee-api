const DashboardController = require('../../controllers/dashboard/dashboard.controller');
const DashboardService = require ('../../services/dashboard/dashboard.service.js');
const SalesVariantRepository = require('../../repositories/transactions/salesVariant.repository');
const DepositRepository = require('../../repositories/payments/deposit.repository');
const LiquidationRepository = require('../../repositories/payments/liquidation.repository');

const router = require ('express').Router();
const { authenticateJWT } = require('../../middlewares/auth.middleware');


const depositRepository = new DepositRepository();
const liquidationRepository = new LiquidationRepository();
const dashboardService = new DashboardService(SalesVariantRepository, liquidationRepository,depositRepository);
const dashboardController = new DashboardController(dashboardService); 

router 
    .post('/data-top', (req, res) => dashboardController.productTop(req, res))
    .get('/total-liquidation', authenticateJWT, (req, res) => dashboardController.getTotalLiquidation(req, res));


module.exports = router;