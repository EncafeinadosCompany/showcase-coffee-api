class AllianceController {
  constructor(storeProviderService) {
    this.storeProviderService = storeProviderService;
  }

  async addAlliance(req, res) {
    try {
      const { storeId, providerId, nit } = req.body;

      const existingProvider = await this.storeProviderService.findProviderByNit(nit);

      if (existingProvider) {

        const isAssociated = await this.storeProviderService.isProviderAssociatedWithStore(storeId, existingProvider.id);

        if (isAssociated) {
          return res.status(400).json({ error: "El proveedor ya está asociado a esta tienda." });
        } else {
          return res.status(200).json({
            message: "El proveedor ya existe. ¿Desea asociarlo a esta tienda?",
            provider: existingProvider,
          });
        }
      }

      const result = await this.storeProviderService.addAlliance(storeId, providerId);
      res.status(201).json(result);
    } catch (error) {
      if (error.message === "La asociación entre store y provider ya existe.") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
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

module.exports = { AllianceController };