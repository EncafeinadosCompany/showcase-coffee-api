'use strict';

const { PROVIDER_TABLE } = require('../../models/provider.entity');
const { BANK_ACCOUNT_TABLE } = require('../../models/bankAccount.entity');

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

    
    const providers = await queryInterface.sequelize.query(
      `SELECT id FROM ${PROVIDER_TABLE};`
    );
    const providerIds = providers[0].map((provider) => provider.id);

   
    await queryInterface.bulkInsert(BANK_ACCOUNT_TABLE, [
      {
        bank_account: '123456722',
        type_account: 'Corriente',
        bank: 'BBVA',
        id_provider: providerIds[0], 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        bank_account: '098765112',
        type_account: 'Ahorro',
        bank: 'Bancolombia',
        id_provider: providerIds[0], 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        bank_account: '112233445',
        type_account: 'Corriente',
        bank: 'Davivienda',
        id_provider: providerIds[1], 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        bank_account: '556677889',
        type_account: 'Ahorro',
        bank: 'Banco de Bogotá',
        id_provider: providerIds[2], 
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(BANK_ACCOUNT_TABLE, null, {});
    await queryInterface.bulkDelete(PROVIDER_TABLE, null, {});
  },
};