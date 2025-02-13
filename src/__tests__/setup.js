const { Sequelize } = require('sequelize');
const config = require('../config/database').test; 
const sequelize = new Sequelize(config);
const { exec } = require('child_process');
const setupModels = require('../models');
const queryInterface = sequelize.getQueryInterface();
const bcrypt = require('bcrypt');
const seedIndex = require('../db/seeders/20250210-seed-index');

beforeAll(async () => {

    setupModels(sequelize);
    await sequelize.sync({ force: true });


    console.log("🧹 Eliminando datos previos...");
    await seedIndex.down(sequelize.getQueryInterface(), sequelize);

    console.log("🌱 Ejecutando seeds...");
    try {
      await seedIndex.up(sequelize.getQueryInterface(), sequelize);
    } catch (error) {
        console.log(error)
        console.error("❌ ERROR ejecutando seeds:");
        console.error("🔍 Error message:", error.message);
        console.error("📌 Stack Trace:", error.stack);
        console.error("💡 SQL Query (si aplica):", error.sql || "No SQL query found");
        process.exit(1);
    }

    console.log("✅ Seeds ejecutados correctamente.");
});

afterAll(async () => {
    await sequelize.close();
});

module.exports = sequelize;
