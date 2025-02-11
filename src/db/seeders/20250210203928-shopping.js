'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Constantes para IDs (deben coincidir con datos existentes en las tablas relacionadas)
    const STORE_ID = 1; // ID de la tienda
    const EMPLOYEE_ID = 1; // ID del empleado
    const VARIANT_PRODUCT_IDS = [1, 2]; // IDs de los productos variantes

    // Insertar datos en la tabla `shoppings`
    const shoppingData = {
      id_store: STORE_ID,
      id_employee: EMPLOYEE_ID,
      date_entry: new Date(),
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Insertar la compra y obtener su ID
    const [shoppingId] = await queryInterface.bulkInsert('shoppings', [shoppingData], {
      returning: ['id'], // Retorna el ID del registro insertado
    });

    // Datos para la tabla `shopping_variant`
    const shoppingVariantData = VARIANT_PRODUCT_IDS.map((id_variant_products, index) => ({
      id_shopping: shoppingId,
      id_variant_products,
      roasting_date: new Date(),
      quantity: index === 0 ? 10 : 5, // Cantidad diferente para cada producto
      shopping_price: index === 0 ? 15.50 : 10.00, // Precio diferente para cada producto
      sale_price: index === 0 ? 20.00 : 15.00, // Precio de venta diferente para cada producto
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    // Insertar los detalles de la compra
    await queryInterface.bulkInsert('shopping_variant', shoppingVariantData);
  },

  async down(queryInterface, Sequelize) {
    // Eliminar los datos insertados en la tabla `shopping_variant`
    await queryInterface.bulkDelete('shopping_variant', null, {});

    // Eliminar los datos insertados en la tabla `shoppings`
    await queryInterface.bulkDelete('shoppings', null, {});
  },
};