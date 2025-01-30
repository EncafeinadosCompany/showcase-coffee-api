const { ProviderModel } = require('../../models/providers/provider.entity');

class ProviderRepository {
    async createProvider(providerData) {
        return await ProviderModel.create(providerData);
    }

    async getAllProviders() {
        return await ProviderModel.findAll();
    }

    async getProviderById(id) {
        return await ProviderModel.findByPk(id);
    }

}

module.exports = { ProviderRepository };