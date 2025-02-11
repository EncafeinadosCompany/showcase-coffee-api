'use strict';

const { USER_TABLE } = require('../../models/users/users.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert( USER_TABLE, [
      {
        id_role: 1,
        email: 'admin@gmail.com',
        password: 'Admin123.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_role: 1,
        email: 'empleadotienda@gmail.com',
        password: 'Empleado123.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
