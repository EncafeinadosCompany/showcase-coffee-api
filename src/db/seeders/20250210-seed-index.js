const { Sequelize } = require("sequelize");
const brandSeeder = require("./20250210165220-brands");
const productSeeder = require("./20250210165111-products");
const attributeSeeder = require("./20250210165043-attributes");
const attributeProductsSeeder = require("./20250210201056-attributes_products");
const variantsSeeder = require("./20250210165140-variants");
const rolesSeeder = require("./20250206153819-roles-seed");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    await rolesSeeder.up(queryInterface, Sequelize);

    await brandSeeder.up(queryInterface, Sequelize);
    await productSeeder.up(queryInterface, Sequelize);
    await attributeSeeder.up(queryInterface, Sequelize);
    await variantsSeeder.up(queryInterface, Sequelize);
    await attributeProductsSeeder.up(queryInterface, Sequelize);
   
  },

  async down(queryInterface, Sequelize) {

    await rolesSeeder.down(queryInterface, Sequelize);

    await attributeSeeder.down(queryInterface, Sequelize);
    await productSeeder.down(queryInterface, Sequelize);
    await brandSeeder.down(queryInterface, Sequelize);
    await variantsSeeder.down(queryInterface, Sequelize);
    await attributeProductsSeeder.down(queryInterface, Sequelize);
    
  },
};
