require('dotenv').config()

const config = {
    development: {
        url: process.env.DB_URL,
    },
    test: {
        url: process.env.DB_URL,
    },
    production: {
        url: process.env.DB_URL,
    },
}

module.exports = config