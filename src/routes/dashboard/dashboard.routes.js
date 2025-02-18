const DashboardController = require('../../controllers/dashboard/dashboard.controller');
const DashboardService = require ('../../services/dashboard/dashboard.service.js');
const ShoppingVariantRepository = require('../../repositories/transactions/shoppingVariant.repository');
// const SalesRepository = require('../../repositories/transactions/sales.repository');
const SalesVariantRepository = require('../../repositories/transactions/salesVariant.repository');
const router = require ('express').Router();

const dashboardService = new DashboardService(SalesVariantRepository);
const dashboardController = new DashboardController(dashboardService); 

router 
    .post('/data-top', (req, res) => dashboardController.productTop(req, res))


module.exports = router;