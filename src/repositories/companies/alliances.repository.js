const { AllianceModel } = require("../../models/companies/alliances.entity");

class AllianceRepository {

  async addAlliance(storeId, providerId) {
    const existingAssociation = await AllianceModel.findOne({
      where: {
        id_store: storeId,
        id_provider: providerId,
      },
    });

    if (existingAssociation) return ("The alliance already exists.");

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
}

module.exports = { AllianceRepository };