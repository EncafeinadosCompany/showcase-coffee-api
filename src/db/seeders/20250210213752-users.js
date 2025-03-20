"use strict";

const bcrypt = require("bcrypt");
const { USER_TABLE } = require("../../models/users/users.entity");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    console.log("🚀 Checking if users table is empty...");

    const [results, metadata] = await queryInterface.sequelize.query(
      `SELECT COUNT(*) AS count FROM ${USER_TABLE};`
    );

    if (results[0].count > 0) {
      console.log("⚠️ Users table is not empty. Skipping seed.");
      return;
    }

    console.log("✅ Users table is empty. Seeding data...");

    const saltRounds = 10;

    await queryInterface.bulkInsert(USER_TABLE, [
      {
        id_role: 1,
        email: "admintienda@gmail.com",
        password: await bcrypt.hash("Admin123.", saltRounds),
      },
      {
        id_role: 2,
        email: "empleadoproveedor@gmail.com",
        password: await bcrypt.hash("Empleado123.", saltRounds),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
