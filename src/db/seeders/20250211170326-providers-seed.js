'use strict';

const { PROVIDER_TABLE } = require('../../models/companies/provider.entity');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(PROVIDER_TABLE, [
      {
        name: 'Café Golosa',
        nit: '1001002-1223',
        email: 'golosa@gmail.com',
        phone: '1234567821',
        address: 'Calle 1233',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Café Aroma',
        nit: '2002003-2334',
        email: 'aroma@gmail.com',
        phone: '2345678321',
        address: 'Calle 4567',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Café Delicia',
        nit: '3003004-3445',
        email: 'delicia@gmail.com',
        phone: '3456789432',
        address: 'Calle 7890',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(PROVIDER_TABLE, null, {});
  },
};
