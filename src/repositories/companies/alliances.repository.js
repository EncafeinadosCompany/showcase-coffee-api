const { AllianceModel } = require("../../models/companies/alliances.entity");
const { ProviderModel } = require("../../models/companies/provider.entity");

class AllianceRepository {
  async addAlliance(storeId, providerId) {
    const existingAssociation = await AllianceModel.findOne({
      where: {
        id_store: storeId,
        id_provider: providerId,
      },
    });

    if (existingAssociation) {
      throw new Error("La asociación entre store y provider ya existe.");
    }

    return await AllianceModel.create({
      id_store: storeId,
      id_provider: providerId,
    });
  }

  async getProvidersByStore(storeId) {
    return await AllianceModel.findAll({
      where: { id_store: storeId },
      include: ["provider"],
    });
  }

  async getStoresByProvider(providerId) {
    return await AllianceModel.findAll({
      where: { id_provider: providerId },
      include: ["store"],
    });
  }

  async findProviderByNit(nit) {
    return await ProviderModel.findOne({
      where: { nit },
    });
  }

  async isProviderAssociatedWithStore(storeId, providerId) {
    const association = await AllianceModel.findOne({
      where: {
        id_store: storeId,
        id_provider: providerId,
      },
    });
    return !!association;
  }
}

module.exports = { AllianceRepository };