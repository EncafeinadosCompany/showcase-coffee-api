const { Sequelize } = require("sequelize");

const roleSeeder = require("./20250206153819-roles-seed");
const userSeeder = require("./20250210213752-users");
const employeeSeeder = require("./20250210213809-employees");

const providerSeeder = require("./20250211170326-providers-seed");
const bankAccountSeeder = require("./20250211171412-bank-accounts-seed");
const storeSeeder = require("./20250211172147-stores-seed");

const brandSeeder = require("./20250210165220-brands");
const productSeeder = require("./20250210165111-products");
const attributeSeeder = require("./20250210165043-attributes");
const attributeProductsSeeder = require("./20250210201056-attributes_products");
const variantsSeeder = require("./20250210165140-variants");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    await roleSeeder.up(queryInterface, Sequelize);
    await userSeeder.up(queryInterface, Sequelize);

    await providerSeeder.up(queryInterface, Sequelize);
    await bankAccountSeeder.up(queryInterface, Sequelize);
    await storeSeeder.up(queryInterface, Sequelize);

    await employeeSeeder.up(queryInterface, Sequelize);

    await brandSeeder.up(queryInterface, Sequelize);
    await productSeeder.up(queryInterface, Sequelize);
    await attributeSeeder.up(queryInterface, Sequelize);
    await variantsSeeder.up(queryInterface, Sequelize);
    await attributeProductsSeeder.up(queryInterface, Sequelize);
    
  },

  async down(queryInterface, Sequelize) {

    await roleSeeder.down(queryInterface, Sequelize);
    await userSeeder.down(queryInterface, Sequelize);

    await providerSeeder.down(queryInterface, Sequelize);
    await bankAccountSeeder.down(queryInterface, Sequelize);
    await storeSeeder.down(queryInterface, Sequelize);

    await employeeSeeder.down(queryInterface, Sequelize);
    
    await attributeSeeder.down(queryInterface, Sequelize);
    await productSeeder.down(queryInterface, Sequelize);
    await brandSeeder.down(queryInterface, Sequelize);
    await variantsSeeder.down(queryInterface, Sequelize);
    await attributeProductsSeeder.down(queryInterface, Sequelize);
    
  },
};
