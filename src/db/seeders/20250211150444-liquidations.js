const { LIQUIDATION_TABLE } = require('../../models/payments/liquidations.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(LIQUIDATION_TABLE, [
      {
        current_debt: 50000,
        status: true,
        id_shopping: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        current_debt: 120000,
        status: false,
        id_shopping: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        current_debt: 30000,
        status: true,
        id_shopping: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(LIQUIDATION_TABLE, null, {});
  },
};
