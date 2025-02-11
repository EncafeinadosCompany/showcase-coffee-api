'use strict';

const { STORE_TABLE } = require('../../models/store.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(STORE_TABLE, [
      {
        name: 'Tienda Central',
        email: 'central@tienda.com',
        phone: '1234567890',
        address: 'Avenida Principal 123',
        logo: 'https://example.com/logos/central.png',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Tienda Norte',
        email: 'norte@tienda.com',
        phone: '0987654321',
        address: 'Calle Norte 456',
        logo: 'https://example.com/logos/norte.png',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Tienda Sur',
        email: 'sur@tienda.com',
        phone: '1122334455',
        address: 'Calle Sur 789',
        logo: 'https://example.com/logos/sur.png',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(STORE_TABLE, null, {});
  },
};
