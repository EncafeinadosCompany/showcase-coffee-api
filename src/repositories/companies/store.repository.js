const { StoreModel } = require('../../models/companies/store.entity');

class StoreRepository {
    async createStore(storeData) {
        return await StoreModel.create(storeData);
    }

    async getAllStores() {
        return await StoreModel.findAll();
    }

    async getStoreById(id) {
        return await StoreModel.findByPk(id);
    }
    async updateStore(id, storeData) {
        const store = await StoreModel.findByPk(id);
        if (store) {
            return await store.update(storeData);
        }
        return null;
    }
}

module.exports = { StoreRepository };