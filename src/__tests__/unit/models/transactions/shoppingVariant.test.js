// require('../../../setup');
// const { ShoppingVariantModel } = require('../../../../models/transactions/shoppingVariant.entity');


// describe('🧪 ShoppingVariantModel - Database Model Tests', () => {
//     let shoppingVariantData;

//     beforeEach(() => {
//         // Datos de prueba
//         shoppingVariantData = {
//             id_shopping: 1,
//             id_variant_products: 1,
//             roasting_date: new Date(),
//             quantity: 10,
//             shopping_price: 5000,
//             sale_price: 7500,
//             status: true
//         };
//     });

//     test('should create a new shopping variant', async () => {
//         const shoppingVariant = await ShoppingVariantModel.create(shoppingVariantData);

//         expect(shoppingVariant).toBeDefined();
//         expect(shoppingVariant.id).toBeDefined();
//         expect(shoppingVariant.id_shopping).toBe(shoppingVariantData.id_shopping);
//         expect(shoppingVariant.id_variant_products).toBe(shoppingVariantData.id_variant_products);
//         expect(shoppingVariant.roasting_date).toEqual(shoppingVariantData.roasting_date);
//         expect(shoppingVariant.quantity).toBe(shoppingVariantData.quantity);
//         expect(shoppingVariant.shopping_price).toBe(shoppingVariantData.shopping_price);
//         expect(shoppingVariant.sale_price).toBe(shoppingVariantData.sale_price);
//         expect(shoppingVariant.status).toBe(shoppingVariantData.status);
//     });
// });
