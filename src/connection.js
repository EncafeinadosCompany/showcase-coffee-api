const { Sequelize } = require('sequelize')
const setupModels = require('./models')
const config = require("./config/config")


console.log("config.db_url")
console.log(config.development.url)

const options = {
    logging: (msg) => console.log(msg),
    dialect: 'postgres',
}

if (config.isProd) {
    options.dialectOptions = {
        ssl: {
            rejectUnauthorized: false
        }
    }
}

const sequelize = new Sequelize(config.development.url, options);

setupModels(sequelize);

module.exports = sequelize;