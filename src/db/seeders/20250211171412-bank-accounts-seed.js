'use strict';

const { BANK_ACCOUNT_TABLE } = require('../../models/companies/bankAccounts.entity');

module.exports = {
  async up(queryInterface, Sequelize) {
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
  },
};
