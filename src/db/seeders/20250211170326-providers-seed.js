'use strict';

const { PROVIDER_TABLE } = require('../../models/companies/provider.entity');

module.exports = {
  async up(queryInterface, Sequelize) {

    const [providers, metadata] = await queryInterface.sequelize.query(
      `SELECT * FROM ${PROVIDER_TABLE}`
    );
    if (providers.length > 0) {
      console.log('⚠️ Providers table is not empty. Skipping seed.');
      return;
    }
    console.log('✅ Providers table is empty. Seeding data...');

    await queryInterface.bulkInsert(PROVIDER_TABLE, [
      {
        id: 1,
        name: 'Café Aroma',
        nit: '900200345-1',
        email: 'aroma@gmail.com',
        phone: '2345678321',
        address: 'Calle 4567',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Café Delicia',
        nit: '901300456-4',
        email: 'delicia@gmail.com',
        phone: '3456789432',
        address: 'Calle 7890',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      }
      
    ]);

    console.log('Providers seeded successfully!');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(PROVIDER_TABLE, null, {});
  },
};
