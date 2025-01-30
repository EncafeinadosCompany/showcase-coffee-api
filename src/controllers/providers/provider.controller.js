const { ProviderService } = require('../../services/providers/provider.service');

class ProviderController {
    constructor() {
        this.providerService = new ProviderService();
    }

    async createProvider(req, res) {
        try {
            const providerData = req.body;
            const provider = await this.providerService.createProvider(providerData);
            res.status(201).json(provider);
        } catch (error) {
            res.status(500).json({ error: `Error creating provider: ${error.message}` });
        }
    }

    async getAllProviders(req, res) {
        try {
            const providers = await this.providerService.getAllProviders();
            res.status(200).json(providers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getProviderById(req, res) {
        try {
            const { id } = req.params;
            const provider = await this.providerService.getProviderById(id);
            if (provider) {
                res.status(200).json(provider);
            } else {
                res.status(404).json({ message: 'Provider not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = { ProviderController };