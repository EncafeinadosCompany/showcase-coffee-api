class StoreProviderController {
    constructor(storeProviderService) {
      this.storeProviderService = storeProviderService;
    }
  
    async addStoreProvider(req, res) {
      try {
        const { storeId, providerId } = req.body;
        const result = await this.storeProviderService.addStoreProvider(storeId, providerId);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    async getProvidersByStore(req, res) {
      try {
        const { storeId } = req.params;
        const providers = await this.storeProviderService.getProvidersByStore(storeId);
        res.status(200).json(providers);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    async getStoresByProvider(req, res) {
      try {
        const { providerId } = req.params;
        const stores = await this.storeProviderService.getStoresByProvider(providerId);
        res.status(200).json(stores);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
  
  module.exports = { StoreProviderController };