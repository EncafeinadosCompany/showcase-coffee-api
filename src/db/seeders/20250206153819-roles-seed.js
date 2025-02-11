'use strict';

const { ROLE_TABLE } = require('../../models/users/roles.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert( ROLE_TABLE, [
      
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
