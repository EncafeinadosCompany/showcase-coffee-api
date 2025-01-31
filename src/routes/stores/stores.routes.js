const express = require('express');
const { StoreController } = require('../../controllers/store/store.controller');

const router = express.Router();
const storeController = new StoreController();

router.post('/', (req, res) => storeController.createStore(req, res));
router.get('/', (req, res) => storeController.getAllStores(req, res));
router.get('/:id', (req, res) => storeController.getStoreById(req, res));
router.put('/:id', (req, res) => storeController.updateStore(req, res));

module.exports = router ;