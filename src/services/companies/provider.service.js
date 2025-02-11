const { ProviderModel } = require('../../models/companies/provider.entity');
class ProviderService {
    constructor(providerRepository) {
        this.providerRepository = providerRepository;
    }

    async createProvider(providerData) {
        const { bankAccounts, ...provider } = providerData;
    
        const transaction = await ProviderModel.sequelize.transaction();
        try {
          const newProvider = await this.providerRepository.createProvider(provider, { transaction });
          if (bankAccounts && bankAccounts.length > 0) {
            const createdBankAccounts = await this.providerRepository.createBankAccounts(
              bankAccounts.map((account) => ({ ...account, id_provider: newProvider.id })),
              { transaction }
            );
            newProvider.bankAccounts = createdBankAccounts;
          }
   
          await transaction.commit();
          return newProvider;
        } catch (error) {
          await transaction.rollback();
          throw error;
        }
      }

    async getAllProviders() {
        return await this.providerRepository.getAllProviders();
    }

    async getProviderById(id) {
        return await this.providerRepository.getProviderById(id);
    }
    async getProviderByNit(nit) {
      return await this.providerRepository.getProviderByNit(nit);
    }

    async getProviderByEmail(email) {
      return await this.providerRepository.getProviderByEmail(email);
    }
}

module.exports = { ProviderService };