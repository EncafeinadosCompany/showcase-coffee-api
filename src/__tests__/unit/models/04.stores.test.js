require('../../setup'); // Asegúrate de que esto configure tu entorno de pruebas
const { StoreModel } = require('../../../models/companies/store.entity');

describe('🧪 StoreModel - Database Model Tests', () => {
    let storeData;

    beforeEach(() => {
        // Datos de ejemplo para las pruebas
        storeData = {
            name: 'Tienda Ejemplo',
            email: 'tienda@ejemplo.com',
            phone: '3001234567',
            address: 'Calle 123 #45-67',
            logo: 'logo.png',
            status: true,
        };
    });

    afterEach(async () => {
        // Limpiar la base de datos después de cada prueba
        await StoreModel.destroy({ where: { name: 'Tienda Ejemplo' } });
    });

    describe('🔹 Model Definition', () => {
        test('should have the correct schema', () => {
            const attributes = StoreModel.getAttributes();

            // Verifica que el modelo tenga las propiedades correctas
            expect(attributes).toHaveProperty('id');
            expect(attributes).toHaveProperty('name');
            expect(attributes).toHaveProperty('email');
            expect(attributes).toHaveProperty('phone');
            expect(attributes).toHaveProperty('address');
            expect(attributes).toHaveProperty('logo');
            expect(attributes).toHaveProperty('status');
            expect(attributes).toHaveProperty('created_at');
            expect(attributes).toHaveProperty('updated_at');
        });
    });

    describe('📝 Model Creation', () => {
        test('should create a new store', async () => {
            try {
                const store = await StoreModel.create(storeData);

                // Verifica que la tienda se haya creado correctamente
                expect(store).toBeDefined();
                expect(store.id).toBeDefined();
                expect(store.name).toBe(storeData.name);
                expect(store.email).toBe(storeData.email);
                expect(store.phone).toBe(storeData.phone);
                expect(store.address).toBe(storeData.address);
                expect(store.logo).toBe(storeData.logo);
                expect(store.status).toBe(storeData.status);
            } catch (error) {
                console.error('Error creating store:', error);
                throw error;
            }
        });

        test('should not allow duplicate emails', async () => {
            try {
                // Crear la primera tienda
                await StoreModel.create(storeData);

                // Intentar crear una segunda tienda con el mismo correo
                const duplicateStore = await StoreModel.create({
                    ...storeData,
                    name: 'Tienda Duplicada',
                });

                // Si no se lanza un error, la prueba falla
                expect(duplicateStore).toBeNull();
            } catch (error) {
                // Verifica que el error sea por violación de unicidad
                expect(error.name).toBe('SequelizeUniqueConstraintError');
            }
        });

        test('should not allow duplicate names', async () => {
            try {
                // Crear la primera tienda
                await StoreModel.create(storeData);

                // Intentar crear una segunda tienda con el mismo nombre
                const duplicateStore = await StoreModel.create({
                    ...storeData,
                    email: 'tienda2@ejemplo.com',
                });

                // Si no se lanza un error, la prueba falla
                expect(duplicateStore).toBeNull();
            } catch (error) {
                // Verifica que el error sea por violación de unicidad
                expect(error.name).toBe('SequelizeUniqueConstraintError');
            }
        });
    });

    describe('🔗 Model Associations', () => {
        test('should have associations with ShoppingModel, EmployeeModel, and ProviderModel', () => {
            const associations = StoreModel.associations;

            expect(associations).toHaveProperty('shopping');
            expect(associations).toHaveProperty('employees');
            expect(associations).toHaveProperty('stores_providers');
        });
    });
});