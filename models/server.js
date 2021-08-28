const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        /* PER UTILITZAR SOCKET.IO AMB EXPRESS */
        this.server = require('http').createServer(this.app); // npm i socket.io https://www.npmjs.com/package/socket.io
        this.io = require('socket.io')(this.server);

        this.paths = {
            
        }

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Configuración de Sockets
        this.sockets();
    }

    middlewares() {

        // CORS npm i cors (una llibreria de middleware)
        this.app.use(cors()); 

        // Directorio público
        this.app.use(express.static('public')); // Use és específic de middlewares

    }

    routes() {

        //this.app.use(this.paths.auth, require('../routes/auth'));   

    }

    sockets() {

        this.io.on("connection", socketController); // Funció del controlador

    }

    listen() {
        this.server.listen(this.port, () => { // Aquí posem this.server perquè funcioni correctament el socket.io
            console.log('Servidor corriendo en puerto' , this.port);
        })
    }

}


module.exports = Server;