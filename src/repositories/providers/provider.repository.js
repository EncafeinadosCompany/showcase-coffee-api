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
                    bankAccounts.map(account => ({ ...account, provider_id: newProvider.id })),
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
    async updateProvider(id, providerData) {
        const { bankAccounts, ...provider } = providerData; 
        const transaction = await ProviderModel.sequelize.transaction(); 
        try {
            const [updatedRows] = await ProviderModel.update(provider, {
                where: { id },
                transaction,
            });

            if (bankAccounts && bankAccounts.length > 0) {
                await BankAccountModel.destroy({
                    where: { provider_id: id },
                    transaction,
                });

                const createdBankAccounts = await BankAccountModel.bulkCreate(
                    bankAccounts.map(account => ({ ...account, provider_id: id })),
                    { transaction }
                );
                providerData.bankAccounts = createdBankAccounts;
            }

            await transaction.commit(); 
            return providerData;
        } catch (error) {
            await transaction.rollback(); 
            throw error;
        }
    }

    async deleteProvider(id) {
        const transaction = await ProviderModel.sequelize.transaction(); // Iniciar una transacción
        try {
            await BankAccountModel.destroy({
                where: { provider_id: id },
                transaction,
            });

            const deletedRows = await ProviderModel.destroy({
                where: { id },
                transaction,
            });
            await transaction.commit(); 
            return deletedRows;
        } catch (error) {
            await transaction.rollback(); 
            throw error;
        }
    }
}
module.exports = { ProviderRepository };