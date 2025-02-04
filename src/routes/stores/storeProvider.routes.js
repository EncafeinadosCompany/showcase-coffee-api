const express = require("express");
const router = express.Router();


const { StoreProviderRepository } = require('../../repositories/stores/storeProvider.repository');
const {StoreProviderService } = require('../../services/stores/storeProvider.service');
const { StoreProviderController } = require("../../controllers/store/storeProvider.controller");


const storeProviderRepository = new StoreProviderRepository();
const storeProviderService = new StoreProviderService(storeProviderRepository);
const storeProviderController = new StoreProviderController(storeProviderService);


  router.post("/", (req, res) => storeProviderController.addStoreProvider(req, res));

  router.get("/store/:storeId", (req, res) => storeProviderController.getProvidersByStore(req, res));

  router.get("/provider/:providerId", (req, res) => storeProviderController.getStoresByProvider(req, res));

  module.exports =  router ;