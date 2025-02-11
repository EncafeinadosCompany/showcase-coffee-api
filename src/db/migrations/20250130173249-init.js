"use strict";

const { DataTypes } = require("sequelize");

const { ROLE_TABLE, roleSchema } = require("../../models/users/roles.entity");
const { USER_TABLE, userSchema } = require("../../models/users/users.entity");

const { STORE_TABLE, storeSchema } = require("../../models/companies/store.entity");
const { PROVIDER_TABLE, providerSchema } = require("../../models/companies/provider.entity");
const { STORE_PROVIDER_TABLE, storeProviderSchema } = require("../../models/companies/alliances.entity");

const { EMPLOYEE_TABLE, employeeSchema } = require("../../models/users/employees.entity");
const { BANK_ACCOUNT_TABLE, bankAccountSchema } = require("../../models/companies/bankAccounts.entity");

const { BRAND_TABLE, brandSchema } = require("../../models/products/brands.entity");
const { PRODUCT_TABLE, productSchema } = require("../../models/products/products.entity");
const { ATTRIBUTE_TABLE, attributeSchema } = require("../../models/products/attribute.entity");
const { ATTRIBUTE_PRODUCT_TABLE, attributeProductSchema } = require("../../models/products/attributesProducts.entity");

const { IMAGE_VARIANTS_TABLE, imageVariantSchema } = require("../../models/products/image_variants.entity");
const { VARIANT_PRODUCT_TABLE, variantProductSchema } = require("../../models/products/variantsProducts.entity");
const { PRODUCT_PROVIDER_TABLE, productProviderSchema } = require("../../models/products/products_providers.entity");

const { SALE_TABLE, saleSchema } = require("../../models/transactions/sales.entity");
const { SALE_VARIANT_TABLE, saleVariantSchema } = require("../../models/transactions/salesVariant.entity");

const { SHOPPING_TABLE, shoppingSchema } = require("../../models/transactions/shopping.entity");
const { SHOPPING_VARIANT_TABLE, shoppingVariantSchema } = require("../../models/transactions/shoppingVariant.entity");

const { LIQUIDATION_TABLE, liquidationSchema } = require("../../models/payments/liquidations.entity");
const { DEPOSIT_TABLE, depositSchema } = require("../../models/payments/deposits.entity");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ROLE_TABLE, roleSchema);
    await queryInterface.createTable(USER_TABLE, userSchema);

    await queryInterface.createTable(PROVIDER_TABLE, providerSchema);
    await queryInterface.createTable(STORE_TABLE, storeSchema);
    await queryInterface.createTable(EMPLOYEE_TABLE, employeeSchema);
    await queryInterface.createTable(BANK_ACCOUNT_TABLE, bankAccountSchema);
    await queryInterface.createTable(STORE_PROVIDER_TABLE, storeProviderSchema);

    await queryInterface.createTable(BRAND_TABLE, brandSchema);
    await queryInterface.createTable(PRODUCT_TABLE, productSchema);
    await queryInterface.createTable(ATTRIBUTE_TABLE, attributeSchema);
    await queryInterface.createTable(ATTRIBUTE_PRODUCT_TABLE, attributeProductSchema);

    await queryInterface.createTable(VARIANT_PRODUCT_TABLE, variantProductSchema);
    await queryInterface.createTable(IMAGE_VARIANTS_TABLE, imageVariantSchema);
    await queryInterface.createTable(PRODUCT_PROVIDER_TABLE, productProviderSchema);
    
    await queryInterface.createTable(SALE_TABLE, saleSchema);
    await queryInterface.createTable(SALE_VARIANT_TABLE, saleVariantSchema);

    await queryInterface.createTable(SHOPPING_TABLE, shoppingSchema);
    await queryInterface.createTable(SHOPPING_VARIANT_TABLE, shoppingVariantSchema);

    await queryInterface.createTable(LIQUIDATION_TABLE, liquidationSchema);
    await queryInterface.createTable(DEPOSIT_TABLE, depositSchema);
  }, 

  async down(queryInterface) {
    await queryInterface.dropTable(ROLE_TABLE);
    await queryInterface.dropTable(USER_TABLE);

    await queryInterface.dropTable(PROVIDER_TABLE);
    await queryInterface.dropTable(STORE_TABLE);
    await queryInterface.dropTable(EMPLOYEE_TABLE);
    await queryInterface.dropTable(BANK_ACCOUNT_TABLE);
    await queryInterface.dropTable(STORE_PROVIDER_TABLE);

    await queryInterface.dropTable(BRAND_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(ATTRIBUTE_TABLE);
    await queryInterface.dropTable(ATTRIBUTE_PRODUCT_TABLE);

    await queryInterface.dropTable(VARIANT_PRODUCT_TABLE);
    await queryInterface.dropTable(IMAGE_VARIANTS_TABLE);
    await queryInterface.dropTable(PRODUCT_PROVIDER_TABLE);

    await queryInterface.dropTable(SALE_TABLE);
    await queryInterface.dropTable(SALE_VARIANT_TABLE);

    await queryInterface.dropTable(SHOPPING_TABLE);
    await queryInterface.dropTable(SHOPPING_VARIANT_TABLE);

    await queryInterface.dropTable(LIQUIDATION_TABLE);
    await queryInterface.dropTable(DEPOSIT_TABLE);
  },
};