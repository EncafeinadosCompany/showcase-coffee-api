class ProviderService {
    constructor(providerRepository) {
        this.providerRepository = providerRepository;
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