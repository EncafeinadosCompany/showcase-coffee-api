const { Sequelize } = require('sequelize');
const dbConfig = require('./database');
const setupModels = require('../models')
const env = process.env.NODE_ENV ;

const config = dbConfig[env];



if (!config) {
    throw new Error(`No se pudo cargar la configuración para el entorno: ${env}`);
}

const sequelize = new Sequelize(config.database, config.username, config.password, config);

setupModels(sequelize)

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log(`\n[${env.toUpperCase()}] Conexión establecida a la base de datos "${config.database}" en el puerto ${config.port}.`);
    } catch (error) {
        console.error(`[${env.toUpperCase()}] Error al conectar a la base de datos:`, error.message);
        throw error;
    }
    return sequelize;
};

module.exports = { sequelize, connectToDatabase };
