const { sequelize } = require('../../config/connection');

const SalesService = require('../../services/sales/sales.service');
const SalesController  = require('../../controllers/sales/sales.controller');
const SalesRepository = require('../../repositories/sales/sales.repository');
const SalesVariantRepository = require('../../repositories/sales/salesVariant.repository');
const ProductVariantsRepository = require('../../repositories/products/products.repository');

const saleVariantRepository = new SalesVariantRepository();
const productVariantsRepository = new ProductVariantsRepository();

const saleRepository = new SalesRepository(productVariantsRepository, saleVariantRepository, sequelize);
const saleService = new SalesService(saleRepository);
const saleController = new SalesController(saleService);

const router = require('express').Router();

router
    .get('/', (req, res) => saleController.getAllSales(req, res))
    .get('/:id', (req, res) => saleController.getSaleById(req, res))
    .post('/', (req, res) => saleController.createSale(req, res))

module.exports = router ;