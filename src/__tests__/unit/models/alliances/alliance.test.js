// require('../../../setup');
// const { AllianceModel } = require('../../../../models/companies/alliances.entity');
// const { StoreModel } = require('../../../../models/companies/store.entity');
// const { ProviderModel } = require('../../../../models/companies/provider.entity');

// describe('🧪 AllianceModel - Database Model Tests', () => {
//     let allianceData;
//     let store;
//     let provider;

//     beforeAll(async () => {
//         // Crear instancias de StoreModel y ProviderModel para las pruebas
//         store = await StoreModel.create({ name: 'Test Store', status: true });
//         provider = await ProviderModel.create({ name: 'Test Provider', status: true });
//     });

//     beforeEach(() => {
//         // Datos de ejemplo para las pruebas
//         allianceData = {
//             id_store: store.id,
//             id_provider: provider.id,
//         };
//     });
// // 
//     afterEach(async () => {
//         // Limpiar la base de datos después de cada prueba
//         await AllianceModel.destroy({ where: {} });
//     });

//     afterAll(async () => {
//         // Limpiar las instancias creadas en beforeAll
//         await StoreModel.destroy({ where: { id: store.id } });
//         await ProviderModel.destroy({ where: { id: provider.id } });
//     });

//     describe('🔹 Model Definition', () => {
//         test('should have the correct schema', () => {
//             const attributes = AllianceModel.getAttributes();
//             expect(attributes).toHaveProperty('id');
//             expect(attributes).toHaveProperty('id_store');
//             expect(attributes).toHaveProperty('id_provider');
//             expect(attributes).toHaveProperty('created_at');
//             expect(attributes).toHaveProperty('updated_at');
//         });
//     });

//     describe('📝 Model Creation', () => {
//         test('should create a new alliance', async () => {
//             try {
//                 const alliance = await AllianceModel.create(allianceData);

//                 expect(alliance).toBeDefined();
//                 expect(alliance.id).toBeDefined();
//                 expect(alliance.id_store).toBe(allianceData.id_store);
//                 expect(alliance.id_provider).toBe(allianceData.id_provider);
//             } catch (error) {
//                 console.error('Error creating alliance:', error);
//                 throw error;
//             }
//         });
//     });

//     describe('🔗 Model Associations', () => {
//         test('should belong to a Store', async () => {
//             const alliance = await AllianceModel.create(allianceData);
//             const associatedStore = await alliance.getStore();

//             expect(associatedStore).toBeDefined();
//             expect(associatedStore.id).toBe(store.id);
//         });

//         test('should belong to a Provider', async () => {
//             const alliance = await AllianceModel.create(allianceData);
//             const associatedProvider = await alliance.getProvider();

//             expect(associatedProvider).toBeDefined();
//             expect(associatedProvider.id).toBe(provider.id);
//         });
//     });
// });