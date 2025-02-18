// require('../../../setup'); // Asegúrate de que esto configure tu entorno de pruebas
// const { AllianceModel } = require('../../../../models/companies/alliances.entity');
// const { StoreModel } = require('../../../../models/companies/store.entity');
// const { ProviderModel } = require('../../../../models/companies/provider.entity');

// describe('🧪 AllianceModel - Database Model Tests', () => {
//     let storeData;
//     let providerData;
//     let allianceData;

//     beforeEach(() => {
//         // Datos de ejemplo para las pruebas
//         storeData = {
//             name: 'Tienda Ejemplo',
//             email: 'tienda@example.com',
//             phone: '1234567890',
//             address: 'Calle 123',
//             status: true,
//         };

//         providerData = {
//             name: 'Proveedor Ejemplo',
//             nit: '123456789-1',
//             email: 'proveedor@example.com',
//             phone: '0987654321',
//             address: 'Calle 456',
//             status: true,
//         };

//         allianceData = {
//             id_store: null, // Se actualizará después de crear la tienda
//             id_provider: null, // Se actualizará después de crear el proveedor
//         };
//     });

//     afterEach(async () => {
//         // Limpiar la base de datos después de cada prueba
//         await AllianceModel.destroy({ where: {} });
//         await StoreModel.destroy({ where: { name: 'Tienda Ejemplo' } });
//         await ProviderModel.destroy({ where: { name: 'Proveedor Ejemplo' } });
//     });

//     describe('📝 Model Creation', () => {
//         test('should create a new alliance between a store and a provider', async () => {
//             try {
//                 // Crear la tienda y el proveedor
//                 const store = await StoreModel.create(storeData);
//                 const provider = await ProviderModel.create(providerData);

//                 // Actualizar los IDs en los datos de la alianza
//                 allianceData.id_store = store.id;
//                 allianceData.id_provider = provider.id;

//                 // Crear la alianza
//                 const alliance = await AllianceModel.create(allianceData);

//                 // Verificar que la alianza se haya creado correctamente
//                 expect(alliance).toBeDefined();
//                 expect(alliance.id).toBeDefined();
//                 expect(alliance.id_store).toBe(store.id);
//                 expect(alliance.id_provider).toBe(provider.id);
//             } catch (error) {
//                 console.error('Error creating alliance:', error);
//                 throw error;
//             }
//         });

//         test('should not allow duplicate alliances', async () => {
//             try {
//                 // Crear la tienda y el proveedor
//                 const store = await StoreModel.create(storeData);
//                 const provider = await ProviderModel.create(providerData);

//                 // Actualizar los IDs en los datos de la alianza
//                 allianceData.id_store = store.id;
//                 allianceData.id_provider = provider.id;

//                 // Crear la primera alianza
//                 await AllianceModel.create(allianceData);

//                 // Intentar crear una segunda alianza con los mismos IDs
//                 await AllianceModel.create(allianceData);

//                 // Si no se lanza un error, la prueba falla
//                 expect(true).toBe(false); // Esto no debería ejecutarse
//             } catch (error) {
//                 // Verificar que el error sea por violación de unicidad
//                 expect(error.name).toBe('SequelizeUniqueConstraintError');
//             }
//         });
//     });

//     describe('🔗 Model Associations', () => {
//         test('should retrieve the store and provider associated with the alliance', async () => {
//             try {
//                 // Crear la tienda y el proveedor
//                 const store = await StoreModel.create(storeData);
//                 const provider = await ProviderModel.create(providerData);

//                 // Actualizar los IDs en los datos de la alianza
//                 allianceData.id_store = store.id;
//                 allianceData.id_provider = provider.id;

//                 // Crear la alianza
//                 const alliance = await AllianceModel.create(allianceData);

//                 // Recuperar la alianza con las asociaciones
//                 const allianceWithAssociations = await AllianceModel.findOne({
//                     where: { id: alliance.id },
//                     include: [
//                         { model: StoreModel, as: 'store' },
//                         { model: ProviderModel, as: 'provider' },
//                     ],
//                 });

//                 // Verificar que las asociaciones estén correctamente cargadas
//                 expect(allianceWithAssociations).toBeDefined();
//                 expect(allianceWithAssociations.store).toBeDefined();
//                 expect(allianceWithAssociations.store.name).toBe(storeData.name);
//                 expect(allianceWithAssociations.provider).toBeDefined();
//                 expect(allianceWithAssociations.provider.name).toBe(providerData.name);
//             } catch (error) {
//                 console.error('Error retrieving alliance with associations:', error);
//                 throw error;
//             }
//         });
//     });
// });