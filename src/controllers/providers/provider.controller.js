class ProviderController {
    constructor(providerService) {
        this.providerService = providerService;
    }

    async createProvider(req, res) {
        try {
            const providerData = req.body; // El body incluye cuentas bancarias
            const provider = await this.providerService.createProvider(providerData);
            res.status(201).json({
                message: "Provider created successfully",
                provider
            });
        } catch (error) {
            res.status(500).json({ error: `Error creating provider: ${error.message}` });
        }
    }

    async getAllProviders(req, res) {
        try {
            const providers = await this.providerService.getAllProviders();
            res.status(200).json(providers);
        } catch (error) {
            res.status(500).json({ error: `Error fetching providers: ${error.message}` });
        }
    }

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
    }
}

module.exports = { ProviderController };
