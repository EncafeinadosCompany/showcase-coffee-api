// require('../../../setup');
// const { SalesVariantModel } = require('../../../../models/transactions/salesVariant.entity');
// const TestDataManager = require("../../utils/testUtils");

// describe('🧪 SalesVariantModel - Database Model Tests', () => {
//     let salesVariantData;

//     beforeEach(async () => {
//         // Crea datos de prueba válidos para las tablas de referencia
//         await TestDataManager.createTestSale();
//         await TestDataManager.createTestVariant();
        

//         // Sample sales variant data for tests
//         salesVariantData = {
//             id_sale: 1,
//             id_shopping_variant:1,
//             id_variant_products:1,
//             quantity: 5,
//             subtotal: 100000,
//             status: true
//         };
//     });

//     afterEach(async () => {
//         await SalesVariantModel.destroy({ where: { id_sale: 1 } });
//         await TestDataManager.cleanupTestData();
//     });

//     describe('🔹 Model Definition', () => {
//         test('should have the correct schema', () => {
//             const attributes = SalesVariantModel.getAttributes();
//             expect(attributes).toHaveProperty('id');
//             expect(attributes).toHaveProperty('id_sale');
//             expect(attributes).toHaveProperty('id_variant_products');
//             expect(attributes).toHaveProperty('quantity');
//             expect(attributes).toHaveProperty('subtotal');
//             expect(attributes).toHaveProperty('status');
//             expect(attributes).toHaveProperty('created_at');
//             expect(attributes).toHaveProperty('updated_at');
//         });
//     });

//     describe('📝 Model Creation', () => {
//         test('should create a new sales variant', async () => {
//             try {
//                 const salesVariant = await SalesVariantModel.create(salesVariantData);

//                 expect(salesVariant).toBeDefined();
//                 expect(salesVariant.id).toBeDefined();
//                 expect(salesVariant.id_sale).toBe(salesVariantData.id_sale);
//                 expect(salesVariant.id_variant_products).toBe(salesVariantData.id_variant_products);
//                 expect(salesVariant.quantity).toBe(salesVariantData.quantity);
//                 expect(salesVariant.subtotal).toBe(salesVariantData.subtotal);
//                 expect(salesVariant.status).toBe(salesVariantData.status);
//             } catch (error) {
//                 console.error('Error creating sales variant:', error);
//                 throw error;
//             }
//         });
//     });
// });