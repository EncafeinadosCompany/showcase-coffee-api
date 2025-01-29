const Server = require('./src/index');

const startServer = async () => {
    try {

        const server = new Server();
        server.listen();

    } catch (error) {
        console.error('Error al iniciar la aplicación:', error.message);
        process.exit(1);
    }

};
module.exports = startServer();
