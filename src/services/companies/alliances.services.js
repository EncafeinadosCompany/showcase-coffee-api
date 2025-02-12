class AllianceService {
  constructor(allianceRepository, liquidationService, ) {
    this.liquidationService = liquidationService;
    this.allianceRepository = allianceRepository;
  }

  async addAlliance(storeId, providerId) {
    console.log('addAlliance', storeId, providerId);

    const newAlliance = await this.allianceRepository.addAlliance(storeId, providerId);
    
    this.liquidationService.createLiquidation(providerId);
    return newAlliance;
  }

  async getProvidersByStore(storeId) {
    return await this.allianceRepository.getProvidersByStore(storeId);
  }

  async getStoresByProvider(providerId) {
    return await this.allianceRepository.getStoresByProvider(providerId);
  }
}

module.exports = { AllianceService };