require('../../../setup'); // Asegúrate de que esto configure tu entorno de pruebas
const { ProviderModel } = require('../../../../models/companies/provider.entity');
const { BankAccountModel } = require('../../../../models/companies/bankAccounts.entity');

describe('🧪 ProviderModel - Database Model Tests', () => {
    let providerData;
    let bankAccountData;

    beforeEach(() => {
        // Datos de ejemplo para las pruebas
        providerData = {
            name: 'Café Aroma',
            nit: '900200345-1',
            email: 'aroma@gmail.com',
            phone: '2345678321',
            address: 'Calle 4567',
            status: true,
        };

        bankAccountData = [
            {
                bank_account: '123456722',
                type_account: 'Corriente',
                bank: 'BBVA',
            },
            {
                bank_account: '098765112',
                type_account: 'Ahorro',
                bank: 'Bancolombia',
            },
        ];
    });

    afterEach(async () => {
        // Limpiar la base de datos después de cada prueba
        await BankAccountModel.destroy({ where: {} });
        await ProviderModel.destroy({ where: { name: 'Café Aroma' } });
    });

    describe('🔹 Model Definition', () => {
        test('should have the correct schema', () => {
            const attributes = ProviderModel.getAttributes();

            // Verifica que el modelo tenga las propiedades correctas
            expect(attributes).toHaveProperty('id');
            expect(attributes).toHaveProperty('name');
            expect(attributes).toHaveProperty('nit');
            expect(attributes).toHaveProperty('email');
            expect(attributes).toHaveProperty('phone');
            expect(attributes).toHaveProperty('address');
            expect(attributes).toHaveProperty('status');
            expect(attributes).toHaveProperty('created_at');
            expect(attributes).toHaveProperty('updated_at');
        });
    });

    describe('📝 Model Creation', () => {
        test('should create a new provider', async () => {
            try {
                const provider = await ProviderModel.create(providerData);

                // Verifica que el proveedor se haya creado correctamente
                expect(provider).toBeDefined();
                expect(provider.id).toBeDefined();
                expect(provider.name).toBe(providerData.name);
                expect(provider.nit).toBe(providerData.nit);
                expect(provider.email).toBe(providerData.email);
                expect(provider.phone).toBe(providerData.phone);
                expect(provider.address).toBe(providerData.address);
                expect(provider.status).toBe(providerData.status);
            } catch (error) {
                console.error('Error creating provider:', error);
                throw error;
            }
        });

        test('should not allow duplicate names', async () => {
            try {
                // Crear el primer proveedor
                await ProviderModel.create(providerData);

                // Intentar crear un segundo proveedor con el mismo nombre
                const duplicateProvider = await ProviderModel.create({
                    ...providerData,
                    nit: '900200345-2', // Cambiar el NIT para evitar conflicto
                });

                // Si no se lanza un error, la prueba falla
                expect(duplicateProvider).toBeNull();
            } catch (error) {
                // Verifica que el error sea por violación de unicidad
                expect(error.name).toBe('SequelizeUniqueConstraintError');
            }
        });

        test('should not allow duplicate NITs', async () => {
            try {
                // Crear el primer proveedor
                await ProviderModel.create(providerData);

                // Intentar crear un segundo proveedor con el mismo NIT
                const duplicateProvider = await ProviderModel.create({
                    ...providerData,
                    name: 'Café Aroma 2', // Cambiar el nombre para evitar conflicto
                });

                // Si no se lanza un error, la prueba falla
                expect(duplicateProvider).toBeNull();
            } catch (error) {
                // Verifica que el error sea por violación de unicidad
                expect(error.name).toBe('SequelizeUniqueConstraintError');
            }
        });
    });

    describe('🔗 Model Associations', () => {
        test('should have associations with BankAccountModel, EmployeeModel, StoreModel, and LiquidationModel', () => {
            const associations = ProviderModel.associations;

            expect(associations).toHaveProperty('bankAccounts');
            expect(associations).toHaveProperty('employees');
            expect(associations).toHaveProperty('provider_store');
            expect(associations).toHaveProperty('liquidations');
        });

        test('should create a provider with bank accounts', async () => {
            try {

                const provider = await ProviderModel.create(providerData);

                const bankAccounts = await BankAccountModel.bulkCreate(
                    bankAccountData.map((account) => ({
                        ...account,
                        id_provider: provider.id,
                    }))
                );

          
                const providerWithBankAccounts = await ProviderModel.findOne({
                    where: { id: provider.id },
                    include: [{ model: BankAccountModel, as: 'bankAccounts' }],
                });

          
                expect(providerWithBankAccounts).toBeDefined();
                expect(providerWithBankAccounts.bankAccounts).toHaveLength(2);
                expect(providerWithBankAccounts.bankAccounts[0].bank_account).toBe(
                    bankAccountData[0].bank_account
                );
                expect(providerWithBankAccounts.bankAccounts[1].bank_account).toBe(
                    bankAccountData[1].bank_account
                );
            } catch (error) {
                console.error('Error creating provider with bank accounts:', error);
                throw error;
            }
        });
    });
});