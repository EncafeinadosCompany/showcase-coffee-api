"use strict";

const { ROLE_TABLE, RoleModel } = require("../../models/users/roles.entity");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await RoleModel.upsert({ name: "Administrador de Cafetería" });
    await RoleModel.upsert({ name: "Empleado de Proveedor" });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(ROLE_TABLE, null, {});
  },
};
