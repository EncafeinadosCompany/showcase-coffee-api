'use strict';

const { PROVIDER_TABLE } = require('../../models/companies/provider.entity');

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkDelete(PROVIDER_TABLE, null, {});

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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(PROVIDER_TABLE, null, {});
  },
};
