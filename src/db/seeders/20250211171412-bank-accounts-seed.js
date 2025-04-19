'use strict';

const { BANK_ACCOUNT_TABLE } = require("../../models/companies/bankAccounts.entity");

module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert(BANK_ACCOUNT_TABLE, [
      {
        bank_account: '123456722',
        type_account: 'Corriente',
        bank: 'BBVA',
        id_provider: 1, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        bank_account: '098765112',
        type_account: 'Ahorro',
        bank: 'Bancolombia',
        id_provider: 1, 
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        bank_account: '112233445',
        type_account: 'Corriente',
        bank: 'Davivienda',
        id_provider: 2, 
        created_at: new Date(),
        updated_at: new Date(),
      }

    ]);

    console.log('Bank accounts seeded successfully!');
  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete(BANK_ACCOUNT_TABLE, null, {});
  },
};