'use strict';

const { STORE_PROVIDER_TABLE } = require("../../models/companies/alliances.entity");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(STORE_PROVIDER_TABLE, [
      { 
        id_store: 1, 
        id_provider: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_store: 1, 
        id_provider: 2, 
        created_at: new Date(),
        updated_at: new Date(),
      }
      
    ]);

    console.log('Store providers seeded successfully!');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(STORE_PROVIDER_TABLE, null, {});
  },
};