const { StoreProviderModel } = require("../../models/stores/storeProvider.entity");

class StoreProviderRepository {
  async addStoreProvider(storeId, providerId) {
    const existingAssociation = await StoreProviderModel.findOne({
      where: {
        id_store: storeId,
        id_provider: providerId,
      },
    });

    if (existingAssociation) {
      throw new Error("La asociación entre store y provider ya existe.");
    }

    return await StoreProviderModel.create({
      id_store: storeId,
      id_provider: providerId,
    });
  }

  async getProvidersByStore(storeId) {
    return await StoreProviderModel.findAll({
      where: { id_store: storeId },
      include: ["provider"],
    });
  }
  
  async getStoresByProvider(providerId) {
    return await StoreProviderModel.findAll({
      where: { id_provider: providerId },
      include: ["store"],
    });
  }
}

module.exports = { StoreProviderRepository };