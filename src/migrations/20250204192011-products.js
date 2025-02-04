'use strict';
    const { VARIANT_PRODUCT_TABLE, variantProductSchema } = require("../models/products/variantsProducts.entity");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(VARIANT_PRODUCT_TABLE, variantProductSchema);
    
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable(VARIANT_PRODUCT_TABLE);
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
