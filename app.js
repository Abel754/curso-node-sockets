require('dotenv').config(); // .config utilitza la config per defecte, el qual és el port 8080

const Server = require('./models/server');

const server = new Server();

server.listen();