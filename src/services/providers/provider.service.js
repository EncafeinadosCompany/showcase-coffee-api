const { ProviderRepository } = require('../../repositories/providers/provider.repository');

class ProviderService {
    constructor() {
        this.providerRepository = new ProviderRepository();
    }

    async createProvider(providerData) {
        return await this.providerRepository.createProvider(providerData);
    }

    async getAllProviders() {
        return await this.providerRepository.getAllProviders();
    }

    async getProviderById(id) {
        return await this.providerRepository.getProviderById(id);
    }
}

module.exports = { ProviderService };