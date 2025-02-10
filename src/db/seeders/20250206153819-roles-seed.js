'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      
      {
        name: 'Administrador de Cafetería',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Empleado de Proveedor',
        created_at: new Date(),
        updated_at: new Date()
      }

    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
