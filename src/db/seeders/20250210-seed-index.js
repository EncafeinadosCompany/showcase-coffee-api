const { Sequelize } = require("sequelize");

const rolesSeeder = require("./20250206153819-roles-seed");
const usersSeeder = require("./20250210213752-users");

const brandSeeder = require("./20250210165220-brands");
const productSeeder = require("./20250210165111-products");
const attributeSeeder = require("./20250210165043-attributes");
const attributeProductsSeeder = require("./20250210201056-attributes_products");
const variantsSeeder = require("./20250210165140-variants");

const shoppingSeeder = require("./20250210203928-shopping");
const salesSeeder = require("./20250210215842-sales");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    // Users
    await rolesSeeder.up(queryInterface, Sequelize);
    await usersSeeder.up(queryInterface, Sequelize);

    // Companies


    // Products
    await brandSeeder.up(queryInterface, Sequelize);
    await productSeeder.up(queryInterface, Sequelize);
    await attributeSeeder.up(queryInterface, Sequelize);
    await variantsSeeder.up(queryInterface, Sequelize);
    await attributeProductsSeeder.up(queryInterface, Sequelize);
   
    // Transactions
    await shoppingSeeder.up(queryInterface, Sequelize);
    await salesSeeder.up(queryInterface, Sequelize);
  },

  async down(queryInterface, Sequelize) {

    // Users
    await rolesSeeder.down(queryInterface, Sequelize);
    await usersSeeder.down(queryInterface, Sequelize);

    // Companies

    // Products
    await attributeSeeder.down(queryInterface, Sequelize);
    await productSeeder.down(queryInterface, Sequelize);
    await brandSeeder.down(queryInterface, Sequelize);
    await variantsSeeder.down(queryInterface, Sequelize);
    await attributeProductsSeeder.down(queryInterface, Sequelize);
    
    // Transactions
    await shoppingSeeder.down(queryInterface, Sequelize);
    await salesSeeder.down(queryInterface, Sequelize);
  },
};
