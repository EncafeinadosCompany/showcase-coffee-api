class StoreProviderService {
    constructor(storeProviderRepository) {
      this.storeProviderRepository = storeProviderRepository;
    }
  
    async addStoreProvider(storeId, providerId) {
      return await this.storeProviderRepository.addStoreProvider(storeId, providerId);
    }
  
    async getProvidersByStore(storeId) {
      return await this.storeProviderRepository.getProvidersByStore(storeId);
    }
  
    async getStoresByProvider(providerId) {
      return await this.storeProviderRepository.getStoresByProvider(providerId);
    }
  }
  
  module.exports = { StoreProviderService };