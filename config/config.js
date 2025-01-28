require('dotenv').config()

const config = {
    jwtSecret: process.env.JWT_SECRET,
    db_url: process.env.DB_URL,
    isProd: process.env.NODE_ENV === 'production',
}

module.exports = config