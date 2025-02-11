class ProviderController {

  constructor(providerService) {
    this.providerService = providerService;
  };

  async createProvider(req, res) {
    try {
      const providerData = req.body;

      const existingProviderByNit = await this.providerService.getProviderByNit(providerData.nit);
      if (existingProviderByNit) {
        return res.status(400).json({ error: "Provider with this NIT already exists." });
      }

      const existingProviderByEmail = await this.providerService.getProviderByEmail(providerData.email);
      if (existingProviderByEmail) {
        return res.status(400).json({ error: "Provider with this email already exists." });
      }

      const newProvider = await this.providerService.createProvider(providerData);
      res.status(201).json(newProvider);
    } catch (error) {
      console.error('Error creating provider:', error);
      res.status(500).json({ error: error.message });
    }
  };

  async getAllProviders(req, res) {
    try {
      const providers = await this.providerService.getAllProviders();
      res.status(200).json(providers);
    } catch (error) {
      console.error('Error fetching providers:', error);
      res.status(500).json({ error: `Error fetching providers: ${error.message}` });
    }
  };

  async getProviderById(req, res) {
    try {
      const { id } = req.params;
      const provider = await this.providerService.getProviderById(id);
      if (!provider) {
        return res.status(404).json({ message: "Provider not found" });
      }
      res.status(200).json(provider);
    } catch (error) {
      res.status(500).json({ error: `Error fetching provider: ${error.message}` });
    }
  };

  async getProviderByNit(req, res) {
    try {
      const { nit } = req.params;
      const provider = await this.providerService.getProviderByNit(nit);
      if (!provider) {
        return res.status(404).json({ message: "Provider not found" });
      }
      res.status(200).json(provider);
    } catch (error) {
      res.status(500).json({ error: `Error fetching provider: ${error.message}` });
    }
  };

  async getProviderByEmail(req, res) {
    try {
      const { email } = req.params;
      const provider = await this.providerService.getProviderByEmail(email);
      if (!provider) {
        return res.status(404).json({ message: "Provider not found" });
      }
      res.status(200).json(provider);
    } catch (error) {
      res.status(500).json({ error: `Error fetching provider: ${error.message}` });
    }
  };
  
}

module.exports = { ProviderController };
