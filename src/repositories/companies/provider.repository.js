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

    async getProviderByNit(nit) {
        return await ProviderModel.findOne({
          where: { nit },
          include: [
            {
              model: BankAccountModel,
              as: "bankAccounts",
            },
          ],
        });
      }

    
      async getProviderByEmail(email) {
        return await ProviderModel.findOne({
          where: { email },
          include: [
            {
              model: BankAccountModel,
              as: "bankAccounts",
            },
          ],
        });
      }

      async updateProvider(id, providerData) {
        const transaction = await ProviderModel.sequelize.transaction();
        try {
            const [updatedRows] = await ProviderModel.update(providerData, {
                where: { id },
                transaction,
            });

            if (updatedRows === 0) {
                throw new Error("Provider not found");
            }

            await transaction.commit();
            return updatedRows;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    // Nuevo método para actualizar cuentas bancarias
    async updateBankAccounts(providerId, bankAccounts) {
        const transaction = await BankAccountModel.sequelize.transaction();
        try {
            // Eliminar cuentas bancarias existentes
            await BankAccountModel.destroy({
                where: { id_provider: providerId },
                transaction,
            });

           
            const createdBankAccounts = await BankAccountModel.bulkCreate(
                bankAccounts.map((account) => ({ ...account, id_provider: providerId })),
                { transaction }
            );

            await transaction.commit();
            return createdBankAccounts;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}
module.exports = { ProviderRepository };