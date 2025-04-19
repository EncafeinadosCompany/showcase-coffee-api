'use strict';

const { STORE_TABLE } = require('../../models/companies/store.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const [stores, metadata] = await queryInterface.sequelize.query(
      `SELECT * FROM ${STORE_TABLE} WHERE id = 1`
    );
    if (stores.length > 0) {
      console.log('⚠️ Stores table is not empty. Skipping seed.');
      return;
    }
    console.log('✅ Stores table is empty. Seeding data...');

    await queryInterface.bulkInsert(STORE_TABLE, [
      {
        id: 1,
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
        id: 2,
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

    console.log('Stores seeded successfully!');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(STORE_TABLE, null, {});
  },
};
