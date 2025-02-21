const { connectToDatabase } = require('./config/connection');

const routerApi = require('./routes');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.host = process.env.DB_HOST;
        
        this.middlewares();
        this.routers();
        this.syncDataBase();
    };

    middlewares() {
        this.app.use(cors({ origin: '*' }));
        this.app.use(express.json({ limit: "50mb" }));
        this.app.use(express.urlencoded({ limit: "50mb", extended: true }));

    };

    routers() {
        routerApi(this.app);
    };

    
    async syncDataBase() {
        try {
            
            await connectToDatabase();
           
        } catch (error) {
            console.error('Error connecting to the database:', error.message);
            throw error;
        }
    };

    listen(){
        this.app.listen(this.port, () => {
            console.log(`\nhttp://${this.host}:${this.port}`);
        });
    };
}

module.exports = Server;
