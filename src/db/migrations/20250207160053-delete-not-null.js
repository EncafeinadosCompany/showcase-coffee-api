'use strict';

const { SALE_TABLE } = require('../../models/transactions/sales.entity');
const { SALE_VARIANT_TABLE } = require('../../models/transactions/salesVariant.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.changeColumn(SALE_TABLE, 'total', {
      type: Sequelize.STRING,
      allowNull: true, 
    });

    await queryInterface.changeColumn(SALE_VARIANT_TABLE, 'subtotal', {
      type: Sequelize.STRING,
      allowNull: true, 
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(SALE_TABLE, 'total', {
      type: Sequelize.STRING,
      allowNull: false, 
    });

    await queryInterface.changeColumn(SALE_VARIANT_TABLE, 'subtotal', {
      type: Sequelize.STRING,
      allowNull: false, 
    });
  }
};
