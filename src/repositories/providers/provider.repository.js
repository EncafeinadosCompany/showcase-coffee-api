const { ProviderModel } = require('../../models/providers/provider.entity');
const { BankAccountModel } = require('../../models/providers/bank_accounts'); 

class ProviderRepository {
    async createProvider(providerData) {
        const { bankAccounts, ...provider } = providerData; 

        const transaction = await ProviderModel.sequelize.transaction(); 
        try {
            const newProvider = await ProviderModel.create(provider, { transaction }); 

            if (bankAccounts && bankAccounts.length > 0) {
                const createdBankAccounts = await BankAccountModel.bulkCreate(
                    bankAccounts.map(account => ({ ...account, id_provider: newProvider.id })),
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