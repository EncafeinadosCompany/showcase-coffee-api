"use strict";

const {
  PRODUCT_TABLE,
  productSchema,
} = require("../models/products/products.entity");
const {
  ATTRIBUTE_TABLE,
  attributeSchema,
} = require("../models/products/attribute.entity");
const {
  ATTRIBUTE_PRODUCT_TABLE,
  attributeProductSchema,
} = require("../models/products/attributesProducts.entity");
const {
  VARIANT_PRODUCT_TABLE,
  variantProductScrema,
} = require("../models/products/variantsProducts.entity");
const {
  BRAND_TABLE,
  brandSchema,
} = require("../models/products/brands.entity");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(BRAND_TABLE, brandSchema);
    await queryInterface.createTable(PRODUCT_TABLE, productSchema);
    await queryInterface.createTable(VARIANT_PRODUCT_TABLE,variantProductScrema);
    await queryInterface.createTable(ATTRIBUTE_TABLE, attributeSchema);
    await queryInterface.createTable(ATTRIBUTE_PRODUCT_TABLE,attributeProductSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(BRAND_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(VARIANT_PRODUCT_TABLE);
    await queryInterface.dropTable(ATTRIBUTE_TABLE);
    await queryInterface.dropTable(ATTRIBUTE_PRODUCT_TABLE);
  },
};
