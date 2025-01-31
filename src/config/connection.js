const { Sequelize } = require('sequelize');
const dbConfig = require('./database'); // Importamos la configuración
const setupModels = require('../models'); // Asegúrate de que setupModels esté bien definido
const env = process.env.NODE_ENV || 'development';

const config = dbConfig[env];

if (!config) {
    throw new Error(`❌ No se pudo cargar la configuración para el entorno: ${env}`);
}

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
    define: config.define,
    dialectOptions: config.dialectOptions
});

// 🛠️ Configurar modelos
setupModels(sequelize);

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log(`✅ [${env.toUpperCase()}] Conexión establecida a la base de datos "${config.database}" en el puerto ${config.port}.`);
    } catch (error) {
        console.error(`❌ [${env.toUpperCase()}] Error al conectar a la base de datos:`, error.message);
        throw error;
    }
    return sequelize;
};

// Exportamos sequelize y la función de conexión
module.exports = { sequelize, connectToDatabase };
