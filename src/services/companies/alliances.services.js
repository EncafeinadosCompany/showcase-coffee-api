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
  }
  
  module.exports = { AllianceService };