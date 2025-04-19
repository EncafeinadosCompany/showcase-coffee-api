const { LIQUIDATION_TABLE } = require('../../models/payments/liquidations.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(LIQUIDATION_TABLE, [
      {
        current_debt: 0,
        status: true,
        id_provider: 1,
        created_at: new Date(),
        updated_at: new Date(),
      }

    ], {});

    console.log('Liquidations seeded successfully!');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(LIQUIDATION_TABLE, null, {});
  },
};
