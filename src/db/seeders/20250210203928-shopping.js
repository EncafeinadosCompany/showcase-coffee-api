// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     // Insertar datos en la tabla `shoppings`
//     await queryInterface.bulkInsert('shoppings', [
//       {
//         id_store: 1, // Asegúrate de que este ID exista en la tabla `stores`
//         id_employee: 1, // Asegúrate de que este ID exista en la tabla `employees`
//         date_entry: new Date(),
//         status: true,
//         created_at: new Date(),
//         updated_at: new Date()
//       }
//     ]);

//     // Obtener el ID de la compra recién insertada
//     const [shopping] = await queryInterface.sequelize.query(
//       'SELECT id FROM shoppings ORDER BY id DESC LIMIT 1'
//     );

//     const shoppingId = shopping[0].id;

//     // Insertar datos en la tabla `shopping_variant`
//     await queryInterface.bulkInsert('shopping_variant', [
//       {
//         id_shopping: shoppingId,
//         id_variant_products: 1, // Asegúrate de que este ID exista en la tabla `variant_products`
//         roasting_date: new Date(),
//         quantity: 10,
//         shopping_price: 15.50,
//         sale_price: 20.00,
//         status: true,
//         created_at: new Date(),
//         updated_at: new Date()
//       },
//       {
//         id_shopping: shoppingId,
//         id_variant_products: 2, // Asegúrate de que este ID exista en la tabla `variant_products`
//         roasting_date: new Date(),
//         quantity: 5,
//         shopping_price: 10.00,
//         sale_price: 15.00,
//         status: true,
//         created_at: new Date(),
//         updated_at: new Date()
//       }
//     ]);
//   },

//   async down (queryInterface, Sequelize) {
//     // Eliminar los datos insertados en la tabla `shopping_variant`
//     await queryInterface.bulkDelete('shopping_variant', null, {});

//     // Eliminar los datos insertados en la tabla `shoppings`
//     await queryInterface.bulkDelete('shoppings', null, {});
//   }
// };