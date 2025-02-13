const dotenv = require('dotenv'); 
const path = require('path');
const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

const isSSL = process.env.DB_SSL_MODE === 'true';

const baseConfig = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'postgres', // Asegura un valor por defecto
    logging: false,
    define: {
        timestamps: true,
        underscored: true,
    },
    dialectOptions: isSSL ? {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
        connectTimeout: 100000,
    } : {}
};

module.exports = {
   
    development: baseConfig,
    production: {
        ...baseConfig,
        dialectOptions: isSSL ? {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        } : {}
    },
    test: {
        ...baseConfig,
        database: process.env.DB_NAME + '_test',
        logging: false,
        dialectOptions: isSSL ? {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        } : {}
    }
};
