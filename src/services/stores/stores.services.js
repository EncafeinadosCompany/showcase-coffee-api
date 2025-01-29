const { StoreRepository } = require('../repositories/store.repository');

class StoreService {
    constructor() {
        this.storeRepository = new StoreRepository();
    }

    async createStore(storeData) {
        return await this.storeRepository.createStore(storeData);
    }

    async getAllStores() {
        return await this.storeRepository.getAllStores();
    }

    async getStoreById(id) {
        return await this.storeRepository.getStoreById(id);
    }

    async updateStore(id, storeData) {
        return await this.storeRepository.updateStore(id, storeData);
    }
}

module.exports = { StoreService };