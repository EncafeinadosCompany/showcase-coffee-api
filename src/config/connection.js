const { Sequelize } = require("sequelize");
const dbConfig = require("./database");
const setupModels = require("../models");
const env = process.env.NODE_ENV || "development";

const config = dbConfig[env];

if (!config) {
  throw new Error(
    `❌ The configuration for the environment could not be loaded: ${env}`
  );
}

let sequelize;

if (env === "production") {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: config.logging,
    dialectOptions: config.dialectOptions,
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
    define: config.define,
    dialectOptions: config.dialectOptions,
  });
}

setupModels(sequelize);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `✅ [${env.toUpperCase()}] Connection established to the "${
        config.database
      }" database on port ${config.port}.`
    );
  } catch (error) {
    console.error(
      `❌ [${env.toUpperCase()}] Error connecting to the database:`,
      error.message
    );
    throw error;
  }
  return sequelize;
};

module.exports = { sequelize, connectToDatabase };
