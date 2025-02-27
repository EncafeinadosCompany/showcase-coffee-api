'use strict';

const {EMPLOYEE_TABLE} = require("../../models/users/employees.entity");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(EMPLOYEE_TABLE, 'identification', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true, 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(EMPLOYEE_TABLE, 'identification', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true, 
    });
  }
};
