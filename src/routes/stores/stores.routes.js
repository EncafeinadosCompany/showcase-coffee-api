const express = require('express');
const { StoreController } = require('../../controllers/store/store.controller');

const router = express.Router();
const storeController = new StoreController();

router.post('/stores', (req, res) => storeController.createStore(req, res));
router.get('/stores', (req, res) => storeController.getAllStores(req, res));
router.get('/stores/:id', (req, res) => storeController.getStoreById(req, res));
router.put('/stores/:id', (req, res) => storeController.updateStore(req, res));

module.exports = router ;