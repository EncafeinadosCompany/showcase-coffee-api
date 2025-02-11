const router = require('express').Router();

const { StoreRepository } = require('../../repositories/companies/store.repository');
const { StoreController } = require('../../controllers/companies/store.controller');
const { StoreService } = require('../../services/companies/stores.service');

const { authenticateJWT } = require('../../middlewares/auth.middleware');

const storeRepository = new StoreRepository();
const storeService = new StoreService(storeRepository);
const storeController = new StoreController(storeService);

router
    .post('/',authenticateJWT, (req, res) => storeController.createStore(req, res))
    .get('/',authenticateJWT, (req, res) => storeController.getAllStores(req, res))
    .get('/:id',authenticateJWT, (req, res) => storeController.getStoreById(req, res))
    .put('/:id',authenticateJWT, (req, res) => storeController.updateStore(req, res));

module.exports = router ;