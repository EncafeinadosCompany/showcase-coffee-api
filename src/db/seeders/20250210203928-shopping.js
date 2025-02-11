'use strict';

const { SHOPPING_TABLE } = require('../../models/transactions/shopping.entity');
const { SHOPPING_VARIANT_TABLE } = require('../../models/transactions/shoppingVariant.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const VARIANT_PRODUCT_IDS = [1, 2]; 

    const shoppingData = {
      id_store: 1,
      id_employee: 2,
      date_entry: new Date(),
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const [shoppingResult] = await queryInterface.bulkInsert(SHOPPING_TABLE, [shoppingData], {
      returning: ['id'],
    });

    const shoppingId = shoppingResult.id;

    const shoppingVariantData = VARIANT_PRODUCT_IDS.map((id_variant_products, index) => ({
      id_shopping: shoppingId,
      id_variant_products,
      roasting_date: new Date(),
      quantity: index === 0 ? 10 : 5,
      shopping_price: index === 0 ? 15500 : 10000,
      sale_price: index === 0 ? 20000 : 15000, 
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert(SHOPPING_VARIANT_TABLE, shoppingVariantData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(SHOPPING_VARIANT_TABLE, null, {});

    await queryInterface.bulkDelete(SHOPPING_TABLE, null, {});
  },
};
