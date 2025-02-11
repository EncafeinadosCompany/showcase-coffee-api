'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('liquidations', [
      {
        current_debt: 500.00,
        status: true,
        id_shopping: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        current_debt: 1200.50,
        status: false,
        id_shopping: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        current_debt: 300.75,
        status: true,
        id_shopping: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('liquidations', null, {});
  },
};
