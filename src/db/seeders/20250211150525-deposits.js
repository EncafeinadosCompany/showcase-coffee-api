'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('deposits', [
      {
        date: new Date('2023-01-15'),
        amount: 100.00,
        type_payment: 'Credit Card',
        voucher: 'voucher12345',
        status: true,
        id_liquidation: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        date: new Date('2023-02-20'),
        amount: 250.75,
        type_payment: 'Bank Transfer',
        voucher: 'voucher67890',
        status: false,
        id_liquidation: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        date: new Date('2023-03-10'),
        amount: 500.50,
        type_payment: 'Cash',
        voucher: 'voucher11223',
        status: true,
        id_liquidation: 3,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('deposits', null, {});
  }
};
