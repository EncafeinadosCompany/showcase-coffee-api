const { StoreProviderModel } = require("../../models/stores/storeProvider.entity");

class StoreProviderRepository {
  async addStoreProvider(storeId, providerId) {
    return await StoreProviderModel.create({
      store_id: storeId,
      provider_id: providerId,
    });
  }

  async getProvidersByStore(storeId) {
    return await StoreProviderModel.findAll({
      where: { store_id: storeId },
      include: ["provider"], 
    });
  }
  async getStoresByProvider(providerId) {
    return await StoreProviderModel.findAll({
      where: { provider_id: providerId },
      include: ["store"], 
    });
  }
}

module.exports = { StoreProviderRepository };