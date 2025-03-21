'use strict';

const { STORE_TABLE } = require('../../models/companies/store.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert(STORE_TABLE, [
      {
        name: 'Tienda Central',
        email: 'central@tienda.com',
        phone: '1234567890',
        address: 'Avenida Principal 123',
        logo: 'https://res.cloudinary.com/dllvnidd5/image/upload/v1739903130',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Tienda Norte',
        email: 'norte@tienda.com',
        phone: '0987654321',
        address: 'Calle Norte 456',
        logo: 'https://res.cloudinary.com/dllvnidd5/image/upload/v1739903130/images-coffee/1739903129971-IMG-20250121-WA0156%5B1%5D%20%281%29.ico.png',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      }
      
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(STORE_TABLE, null, {});
  },
};
