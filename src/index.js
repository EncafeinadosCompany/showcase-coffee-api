const express = require('express')
const cors = require('cors')
const sequelize = require('./connection');


async function assertDatabaseConnectionOk() {
    console.log(`Checking database connection...`);
    
    try {
        await sequelize.authenticate()
        console.log('Database connection OK!')  

        // await sequelize.sync({force: true})  

    } catch (error) {
        console.log('Unable to connect to the database:')
        console.log(error.message);
       
        process.exit(1);
    }
}

const createApp = () => {
    const app = express()

    assertDatabaseConnectionOk()


    app.use(express.json())
    app.use(cors())

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })


    return app
}

module.exports = createApp