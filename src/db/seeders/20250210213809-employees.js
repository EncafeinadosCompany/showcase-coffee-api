'use strict';

const { EMPLOYEE_TABLE } = require('../../models/users/employees.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert( EMPLOYEE_TABLE, [
      {
        id_user: 1,
        identification: '100001',
        name: 'Jader',
        last_name: 'Rojas',
        phone: '1234567',
        email: 'admintienda@gmail.com',
        type: 'store',
        id_store: 1
      },
      {
        id_user: 2,
        identification:"100002",
        name:'Camila',
        last_name:'Ortega',
        phone:'1234567',
        email:'empleadoproveedor@gmail.com',
        type:'provider',
        id_provider:1
      }

    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employees', null, {});
  }
};
