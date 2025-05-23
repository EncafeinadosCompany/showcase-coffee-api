const dotenv = require("dotenv");
const { url } = require("inspector");
const path = require("path");

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

const isSSL = process.env.DB_SSL_MODE === "true";

console.log(`Connection data for ${env} environment:`);
console.log(`DB_USER: ${process.env.DB_USER}`);

if (env === "production" && !process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set in production environment");
  process.exit(1);
}

if (env === "development" && !process.env.DB_USER) {
  console.error("DB_USER is not set in development environment");
  process.exit(1);
} 

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
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
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
