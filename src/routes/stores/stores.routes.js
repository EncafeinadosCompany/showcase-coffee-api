const express = require('express');
const router = express.Router();
const { StoreRepository } = require('../../repositories/stores/store.repository');
const { StoreService } = require('../../services/stores/stores.service');
const { StoreController } = require('../../controllers/store/store.controller');

const storeRepository = new StoreRepository();
const storeService = new StoreService(storeRepository);
const storeController = new StoreController(storeService);

router.post('/', (req, res) => storeController.createStore(req, res));
router.get('/', (req, res) => storeController.getAllStores(req, res));
router.get('/:id', (req, res) => storeController.getStoreById(req, res));
router.put('/:id', (req, res) => storeController.updateStore(req, res));

module.exports = router ;