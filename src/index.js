const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./config/connection')

require('dotenv').config();

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.middlewares();
        this.routers();
        this.syncDataBase();

    };

    middlewares() {
        this.app.use(cors({ origin: '*' }));

        this.app.use(express.json());
    };

    routers(){ }

    async syncDataBase() {
        try {
            await connectToDatabase();
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error.message);
            throw error;
        }
    };

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    };
}

module.exports = Server;