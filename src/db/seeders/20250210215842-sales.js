'use strict';

const { SALE_TABLE } = require('../../models/transactions/sales.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert( SALE_TABLE, [
      {
        date: new Date(),
        type_payment: "Efectivo",
        total: 85000,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete( SALE_TABLE, null, {});
  }
};
