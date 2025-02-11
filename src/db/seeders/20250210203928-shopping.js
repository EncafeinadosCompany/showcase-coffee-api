'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const STORE_ID = 1; 
    const EMPLOYEE_ID = 2; 
    const VARIANT_PRODUCT_IDS = [1]; 

    const shoppingData = {
      id_store: STORE_ID,
      id_employee: EMPLOYEE_ID,
      date_entry: new Date(),
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const [shoppingResult] = await queryInterface.bulkInsert('shopping', [shoppingData], {
      returning: ['id'],
    });

    const shoppingId = shoppingResult.id;

    const shoppingVariantData = VARIANT_PRODUCT_IDS.map((id_variant_products) => ({
      id_shopping: shoppingId,
      id_variant_products,
      roasting_date: new Date(),
      quantity: 5,
      shopping_price: 10000, 
      sale_price: 15000, 
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert('shopping_variant', shoppingVariantData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('shopping_variant', null, {});

    await queryInterface.bulkDelete('shopping', null, {});
  },
};
