'use strict';

const { STORE_PROVIDER_TABLE } = require('../../models/companies/alliances.entity');
const { PROVIDER_TABLE } = require('../../models/companies/provider.entity');
const { STORE_TABLE } = require('../../models/companies/store.entity');

module.exports = {
  async up(queryInterface, Sequelize) {
    
    const providers = await queryInterface.sequelize.query(
      `SELECT id FROM ${PROVIDER_TABLE};`
    );
    const stores = await queryInterface.sequelize.query(
      `SELECT id FROM ${STORE_TABLE};`
    );

    const providerIds = providers[0].map((provider) => provider.id);
    const storeIds = stores[0].map((store) => store.id);
    await queryInterface.bulkInsert(STORE_PROVIDER_TABLE, [
      {
        id_store: storeIds[0],
        id_provider: providerIds[0],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_store: storeIds[0],
        id_provider: providerIds[1],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_store: storeIds[1],
        id_provider: providerIds[1],
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(STORE_PROVIDER_TABLE, null, {});
  },
};
