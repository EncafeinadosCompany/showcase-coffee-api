"use strict";
const { ATTRIBUTE_PRODUCT_TABLE } = require("../../models/products/attributesProducts.entity");
const {BRAND_TABLE} = require("../../models/products/brands.entity");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // ATTRIBUTES_PRODUCTS

    await queryInterface.changeColumn(ATTRIBUTE_PRODUCT_TABLE, "value", {
      type: Sequelize.STRING(500), 
      allowNull: false,
    }),

    // BRANDS

    await queryInterface.changeColumn(BRAND_TABLE, "purpose", {
      type: Sequelize.STRING(500),
      allowNull: true,
    });

    await queryInterface.changeColumn(BRAND_TABLE, "description", {
      type: Sequelize.STRING(500),
      allowNull: true
    });

  },

  async down(queryInterface, Sequelize) {
    
    // ATTRIBUTES_PRODUCTS
    await queryInterface.changeColumn(ATTRIBUTE_PRODUCT_TABLE, "value", {
      type: Sequelize.STRING(300), 
      allowNull: false
    })


    //BRANDS
    await queryInterface.changeColumn(BRAND_TABLE, "purpose", {
      type: Sequelize.STRING(500),
      allowNull: true,
    })

    await queryInterface.changeColumn(BRAND_TABLE, "description", {
      type: Sequelize.STRING(500),
      allowNull: true
    })
  },
};
