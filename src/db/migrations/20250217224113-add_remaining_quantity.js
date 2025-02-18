'use strict';

const { SHOPPING_VARIANT_TABLE } = require('../../models/transactions/shoppingVariant.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn(SHOPPING_VARIANT_TABLE, 'remaining_quantity', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, 
    });

  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.removeColumn(SHOPPING_VARIANT_TABLE, 'remaining_quantity');

  }
};
