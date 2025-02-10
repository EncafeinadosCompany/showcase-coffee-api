class AllianceService {
    constructor(storeProviderRepository) {
      this.storeProviderRepository = storeProviderRepository;
    }
  
    async addAlliance(storeId, providerId) {
      return await this.storeProviderRepository.addAlliance(storeId, providerId);
    }
  
    async getProvidersByStore(storeId) {
      return await this.storeProviderRepository.getProvidersByStore(storeId);
    }
  
    async getStoresByProvider(providerId) {
      return await this.storeProviderRepository.getStoresByProvider(providerId);
    }

    async findProviderByNit(nit) {
      return await this.storeProviderRepository.findProviderByNit(nit);
    }
  
    async isProviderAssociatedWithStore(storeId, providerId) {
      return await this.storeProviderRepository.isProviderAssociatedWithStore(storeId, providerId);
    }
  }
  
  module.exports = { AllianceService };