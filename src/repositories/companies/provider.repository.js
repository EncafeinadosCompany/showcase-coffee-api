const { ProviderModel } = require('../../models/companies/provider.entity');
const { BankAccountModel } = require('../../models/companies/bankAccounts.entity'); 

class ProviderRepository {
    async createProvider(providerData) {
        return await ProviderModel.create(providerData);
      }
    
      async createBankAccounts(bankAccounts) {
        return await BankAccountModel.bulkCreate(bankAccounts);
      }
    
    async getAllProviders() {
        return await ProviderModel.findAll({
            include: [
                {
                    model: BankAccountModel,
                    as: 'bankAccounts', 
                },
            ],
        });
    }
    async getProviderById(id) {
        return await ProviderModel.findByPk(id, {
            include: [
                {
                    model: BankAccountModel,
                    as: 'bankAccounts', 
                },
            ],
        });
    }
}
module.exports = { ProviderRepository };