"use strict";

const bcrypt = require("bcrypt");
const { USER_TABLE } = require("../../models/users/users.entity");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;

    const users = [
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
    ];

    for (const user of users) {
      await User.upsert(user);
    }

    console.log("✅ Users seeded");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
