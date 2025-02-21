'use strict';

const {DEPOSIT_TABLE} = require("../../models/payments/deposits.entity")
const {LIQUIDATION_TABLE} = require("../../models/payments/liquidations.entity")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(DEPOSIT_TABLE, 'amount', {
      type: Sequelize.FLOAT,
      allowNull: false, 
    });

    await queryInterface.changeColumn(LIQUIDATION_TABLE, 'current_debt', {
      type: Sequelize.FLOAT,
      allowNull: false, 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(DEPOSIT_TABLE, 'amount', {
      type: Sequelize.FLOAT,
      allowNull: false, 
    });

    await queryInterface.changeColumn(LIQUIDATION_TABLE, 'current_debt', {
      type: Sequelize.FLOAT,
      allowNull: false, 
    });

  },
  
};
