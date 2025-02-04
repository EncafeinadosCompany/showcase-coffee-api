"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("providers", "bank_account");
    await queryInterface.removeColumn("providers", "type_account");
    await queryInterface.removeColumn("providers", "bank");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("providers", "bank_account", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
    await queryInterface.addColumn("providers", "type_account", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("providers", "bank", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};