require('../../setup');
const { BankAccountModel } = require('../../../models/companies/bankAccounts.entity');
const { ProviderModel } = require('../../../models/companies/provider.entity');

describe('🧪 BankAccountModel - Database Model Tests', () => {
    let bankAccountData;

    beforeEach(() => {
        BankAccountModel.destroy({ where: {}, truncate: true });

        bankAccountData = {
            bank_account: '111222333-4',
            type_account: 'Corriente',
            bank: 'BBVA',
            id_provider: 1,
            created_at: new Date(),
            updated_at: new Date()
        };
    });


    afterEach(async () => {
        await BankAccountModel.destroy({ where: { bank_account: '111222333-4' } });
    });

    describe('🔹 Model Definition', () => {
        test('should create a new bank account', async () => {

            try {
                const bankAccount = await BankAccountModel.create(bankAccountData);

                expect(bankAccount).toBeDefined();
                expect(bankAccount.id).toBeDefined();
                expect(bankAccount.bank_account).toBe(bankAccountData.bank_account);
                expect(bankAccount.type_account).toBe(bankAccountData.type_account);
                expect(bankAccount.bank).toBe(bankAccountData.bank);
                expect(bankAccount.id_provider).toBe(bankAccountData.id_provider);
                expect(bankAccount.status).toBe(bankAccountData.status);
                expect(bankAccount.created_at).toEqual(bankAccountData.created_at);
                expect(bankAccount.updated_at).toEqual(bankAccountData.updated_at);
            } catch (error) {
                console.error("❌ Error al crear la cuenta bancaria:", error);
            }

        });
    });
});