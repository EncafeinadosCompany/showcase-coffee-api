// require('../../../setup');
// const { SalesVariantModel } = require('../../../../models/transactions/salesVariant.entity');
// const { SalesModel } = require('../../../../models/transactions/sales.entity'); // Asegúrate de que las tablas de referencia existan
// const { VariantProductModel } = require('../../../../models/products/variantsProducts.entity'); // Asegúrate de que las tablas de referencia existan

// describe('🧪 SalesVariantModel - Database Model Tests', () => {
//     let salesVariantData;

//     beforeEach(async () => {
//         // Crea datos de prueba válidos para las tablas de referencia
//         await SalesModel.create({ id: 1, date: new Date(), type_payment: 'Credit Card', total: 150.75, status: true });
//         await VariantProductModel.create({ id: 1, name: 'Variant 1', id_product:1, grammage:200, status: true });

//         // Sample sales variant data for tests
//         salesVariantData = {
//             id_sale: 1,
//             id_variant_products: 2,
//             quantity: 5,
//             subtotal: 100000,
//             status: true
//         };
//     });

//     afterEach(async () => {
//         await SalesVariantModel.destroy({ where: { id_sale: 1 } });
//         await SalesModel.destroy({ where: { id: 1 } });
//         await VariantProductModel.destroy({ where: { id: 1 } });
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
