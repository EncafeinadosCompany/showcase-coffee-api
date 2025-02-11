'use strict';

const { ROLE_TABLE } = require('../../models/users/roles.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert( ROLE_TABLE, [
      
      {
        name: 'Administrador de Cafetería',
      },
      {
        name: 'Empleado de Proveedor',
      }

    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete( ROLE_TABLE, null, {});
  }
};
