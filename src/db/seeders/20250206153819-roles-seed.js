"use strict";

const { ROLE_TABLE } = require("../../models/users/roles.entity");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    console.log("🚀 Checking if roles table is empty...");

    const [results, metadata] = await queryInterface.sequelize.query(
      `SELECT COUNT(*) AS count FROM ${ROLE_TABLE};`
    );

    if (results[0].count > 0) {
      console.log("⚠️ Roles table is not empty. Skipping seed.");
      return;
    }

    console.log("✅ Roles table is empty. Seeding data...");

    await queryInterface.bulkInsert(ROLE_TABLE, [
      {
        name: "Administrador de Cafetería",
      },
      {
        name: "Empleado de Proveedor",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(ROLE_TABLE, null, {});
  },
};
