const { DEPOSIT_TABLE } = require('../../models/payments/deposits.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert(DEPOSIT_TABLE, [
      {
        date: new Date(),
        amount: 7000,
        type_payment: 'Tarjeta',
        voucher: 'voucher1',
        status: true,
        id_liquidation: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        date: new Date(),
        amount: 20000,
        type_payment: 'Transferencia',
        voucher: 'voucher2',
        status: false,
        id_liquidation: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(DEPOSIT_TABLE, null, {});
  }
};
