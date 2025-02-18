require('../../setup');
const { ProviderModel } = require('../../../models/companies/provider.entity');

describe('🧪 ProviderModel - Database Model Tests', () => {
    let providerData;

    beforeEach(() => {

        providerData = {
            name: 'Café Aroma',
            nit: '900200345-1',
            email: 'aroma@gmail.com',
            phone: '2345678321',
            address: 'Calle 4567',
            status: true,
        };

    });

    afterEach(async () => {
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

});