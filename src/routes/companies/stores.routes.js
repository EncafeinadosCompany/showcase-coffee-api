const router = require('express').Router();

const { StoreRepository } = require('../../repositories/companies/store.repository');
const { StoreController } = require('../../controllers/companies/store.controller');
const { StoreService } = require('../../services/companies/stores.service');

const { authenticateJWT } = require('../../middlewares/auth.middleware');

const storeRepository = new StoreRepository();
const storeService = new StoreService(storeRepository);
const storeController = new StoreController(storeService);

router
    .post('/', (req, res) => storeController.createStore(req, res))
    .get('/', (req, res) => storeController.getAllStores(req, res))
    .get('/:id', (req, res) => storeController.getStoreById(req, res))
    .put('/:id', (req, res) => storeController.updateStore(req, res));

module.exports = router ;