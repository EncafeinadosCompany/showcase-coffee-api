const { DEPOSIT_TABLE } = require('../sequelize-cli/models/deposits.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(DEPOSIT_TABLE, [
      {
        date: new Date(''),
        amount: 100.00,
        type_payment: 'Tarjeta de Crédito',
        voucher: 'voucher12345',
        status: true,
        id_liquidation: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        date: new Date(''),
        amount: 250.75,
        type_payment: 'Transferencia Bancaria',
        voucher: 'voucher67890',
        status: false,
        id_liquidation: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        date: new Date(''),
        amount: 500.50,
        type_payment: 'Efectivo',
        voucher: 'voucher11223',
        status: true,
        id_liquidation: 3,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(DEPOSIT_TABLE, null, {});
  }
};
