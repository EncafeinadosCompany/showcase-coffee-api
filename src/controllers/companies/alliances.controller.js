class AllianceController {

  constructor(storeProviderService) {
    this.storeProviderService = storeProviderService;
  }

  async addAlliance(req, res) {
    try {
      const { storeId, providerId } = req.body;
      const result = await this.storeProviderService.addAlliance(storeId, providerId);
      res.status(201).json(result);
    } catch (error) {
      if (error.message === "La asociación entre store y provider ya existe.") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
      console.error('Error creating alliance:', error);
    }
  };

  async getProvidersByStore(req, res) {
    try {
      const { storeId } = req.params;
      const providers = await this.storeProviderService.getProvidersByStore(storeId);
      res.status(200).json(providers);
    } catch (error) {
      console.error('Error getting providers by store:', error);
      res.status(500).json({ error: error.message });
    }
  };

  async getStoresByProvider(req, res) {
    try {
      const { providerId } = req.params;
      const stores = await this.storeProviderService.getStoresByProvider(providerId);
      res.status(200).json(stores);
    } catch (error) {
      console.error('Error getting stores by provider:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
}

module.exports = { AllianceController };