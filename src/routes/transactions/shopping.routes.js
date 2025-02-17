const express = require('express');

const ShoppingVariantRepository = require('../../repositories/transactions/shoppingVariant.repository');
const { AllianceRepository } = require('../../repositories/companies/alliances.repository');
const ShoppingRepository = require('../../repositories/transactions/shopping.repository');
const VariantRepository = require('../../repositories/products/variant.repository');
const EmployeeRepository = require('../../repositories/users/employee.repository');
const LiquidationService = require('../../services/payments/liquidation.service');
const LiquidationRepository = require('../../repositories/payments/liquidation.repository');
const { sequelize } = require('../../config/connection');
const { AllianceService } = require('../../services/companies/alliances.services');
const ShoppingService = require('../../services/transactions/shopping.service');
const ShoppingController = require('../../controllers/transactions/shopping.controller');
const shoppingValidation = require('../../middlewares/transactions/shopping.validation');

const shoppingVariantRepository = new ShoppingVariantRepository();
const productVariantsRepository = new VariantRepository();

const employeeRepository = new EmployeeRepository();
const alliancesRepository = new AllianceRepository();
const liquidationRepository = new LiquidationRepository();
const liquidationService = new LiquidationService(liquidationRepository);
const allianceService = new AllianceService(alliancesRepository, liquidationService);

const shoppingRepository = new ShoppingRepository();
const shoppingService = new ShoppingService(shoppingRepository, shoppingVariantRepository, productVariantsRepository, employeeRepository, allianceService, sequelize);
const shoppingController = new ShoppingController(shoppingService);

const { authenticateJWT } = require('../../middlewares/auth.middleware');

const router = express.Router();

router
  .get('/', authenticateJWT, (req, res) => shoppingController.getAllShopping(req, res))
  .get('/shopping-variants', authenticateJWT, (req, res) => shoppingController.getAllShoppingVariant(req, res))
  .get('/shopping-variants/:id', authenticateJWT, (req, res) => shoppingController.getShoppingVariantById(req, res))
  .get('/shopping-variants-by-shopping/:id', authenticateJWT, (req, res) => shoppingController.getShoppingVariantsByShoppingId(req, res))
  .get('/:id', authenticateJWT, (req, res) => shoppingController.getShoppingById(req, res))
  .post('/', authenticateJWT, shoppingValidation, (req, res) => shoppingController.createShopping(req, res));

module.exports = router;