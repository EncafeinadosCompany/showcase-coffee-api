'use strict';

const { SALE_VARIANT_TABLE } = require('../../models/transactions/salesVariant.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert( SALE_VARIANT_TABLE, [
      {
        id_sale: 1,
        id_variant_products: 1,
        quantity: 2,
        subtotal: 40000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_sale: 1,
        id_variant_products: 2,
        quantity: 3,
        subtotal: 45000,
        created_at: new Date(),
        updated_at: new Date(),
      }

    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete( SALE_VARIANT_TABLE, null, {});
  }
};
