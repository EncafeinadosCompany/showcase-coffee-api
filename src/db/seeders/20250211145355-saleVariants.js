'use strict';

const { SALE_VARIANT_TABLE } = require('../../models/transactions/salesVariant.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert( SALE_VARIANT_TABLE, [
      {
        id_sale: 1,
        id_variant_products: 1,
        id_shopping_variant:1,
        quantity: 2,
        subtotal: 50000,
        created_at: new Date(),
        updated_at: new Date(),
      }

    ]);

    console.log('Sale variants seeded successfully!');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete( SALE_VARIANT_TABLE, null, {});
  }
};
