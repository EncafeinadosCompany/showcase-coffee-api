const { Sequelize } = require("sequelize");

const roleSeeder = require("./20250206153819-roles-seed");
const userSeeder = require("./20250210213752-users");
const employeeSeeder = require("./20250210213809-employees");

const providerSeeder = require("./20250211170326-providers-seed");
const bankAccountSeeder = require("./20250211171412-bank-accounts-seed");
const storeSeeder = require("./20250211172147-stores-seed");
const allianceSeeder = require("./20250211172804-alliances-seed");

const brandSeeder = require("./20250210165220-brands");
const productSeeder = require("./20250210165111-products");
const attributeSeeder = require("./20250210165043-attributes");
const attributeProductsSeeder = require("./20250210201056-attributes_products");
const variantsSeeder = require("./20250210165140-variants");

const shoppingSeeder = require("./20250210203928-shopping");
const salesSeeder = require("./20250210215842-sales");
const saleVariantsSeeder = require("./20250211145355-saleVariants");

const liquidationSeeder = require("./20250211150444-liquidations");
const depositSeeder = require("./20250211150525-deposits");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    // Users
    await roleSeeder.up(queryInterface, Sequelize);
    await userSeeder.up(queryInterface, Sequelize);

    // Companies
    await providerSeeder.up(queryInterface, Sequelize);
    await bankAccountSeeder.up(queryInterface, Sequelize);
    await storeSeeder.up(queryInterface, Sequelize);
    await allianceSeeder.up(queryInterface, Sequelize);

    await employeeSeeder.up(queryInterface, Sequelize);

    // Products
    await brandSeeder.up(queryInterface, Sequelize);
    await productSeeder.up(queryInterface, Sequelize);
    await attributeSeeder.up(queryInterface, Sequelize);
    await variantsSeeder.up(queryInterface, Sequelize);
    await attributeProductsSeeder.up(queryInterface, Sequelize);
   
    // Transactions
    await shoppingSeeder.up(queryInterface, Sequelize);
    await salesSeeder.up(queryInterface, Sequelize);
    await saleVariantsSeeder.up(queryInterface, Sequelize);

    // Payments
    await liquidationSeeder.up(queryInterface, Sequelize);
    await depositSeeder.up(queryInterface, Sequelize);
  },

  async down(queryInterface, Sequelize) {

    // Users
    await roleSeeder.down(queryInterface, Sequelize);
    await userSeeder.down(queryInterface, Sequelize);

    // Companies
    await providerSeeder.down(queryInterface, Sequelize);
    await bankAccountSeeder.down(queryInterface, Sequelize);
    await storeSeeder.down(queryInterface, Sequelize);
    await allianceSeeder.down(queryInterface, Sequelize);

    await employeeSeeder.down(queryInterface, Sequelize);
    
    // Products
    await attributeSeeder.down(queryInterface, Sequelize);
    await productSeeder.down(queryInterface, Sequelize);
    await brandSeeder.down(queryInterface, Sequelize);
    await variantsSeeder.down(queryInterface, Sequelize);
    await attributeProductsSeeder.down(queryInterface, Sequelize);
    
    // Transactions
    await shoppingSeeder.down(queryInterface, Sequelize);
    await salesSeeder.down(queryInterface, Sequelize);
    await saleVariantsSeeder.down(queryInterface, Sequelize);

    // Payments
    await liquidationSeeder.down(queryInterface, Sequelize);
    await depositSeeder.down(queryInterface, Sequelize);
  },
};
