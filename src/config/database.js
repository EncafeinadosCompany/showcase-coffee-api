const dotenv = require("dotenv");
const { url } = require("inspector");
const path = require("path");

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

const isSSL = process.env.DB_SSL_MODE === "true";

console.log(`🚀 Environment ${env} DB ${process.env.DATABASE_URL}`);

const baseConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT || "postgres",
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
  dialectOptions: isSSL
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
        connectTimeout: 100000,
      }
    : {},
};

module.exports = {
  development: baseConfig,
  production: {
    dialect: process.env.DB_DIALECT || "postgres",
    logging: false,
    url: process.env.DATABASE_URL,
    define: {
      timestamps: true,
      underscored: true,
    },
    dialectOptions: isSSL
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  },
};
