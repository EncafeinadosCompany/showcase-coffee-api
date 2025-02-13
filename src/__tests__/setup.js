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

    console.log("✅ Base de datos sincronizada.");

    console.log("🧹 Eliminando datos previos...");
    await seedIndex.down(sequelize.getQueryInterface(), sequelize);

    console.log("🌱 Ejecutando seeds...");
    await seedIndex.up(sequelize.getQueryInterface(), sequelize);

    console.log("✅ Seeds ejecutados correctamente.");
});

afterAll(async () => {
    await sequelize.close();
});

module.exports = sequelize;
