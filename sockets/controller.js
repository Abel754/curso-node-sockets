

const socketController = (socket) => { // Aquí establim la connexió amb el socket, però hem d'acabar la connexió amb el client, (socket-client.js)

    console.log('Cliente conectado', socket.id); // Cada connexió ve amb un id específic

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });

    socket.on('enviar-mensaje', (payload, callback) => { // Al'arxiu socket-client.js hem fet un emit i li hem nombrat enviar-mensaje. És el que agafem aquí. Ho agafem des de la part del servidor (l'usuari no veu). Al fer un emit de la funció s'envien dos paràmetres, els agafem aquí amb noms payload i callback

        const id = 123456;
        callback(id);
        // broadcast perquè els demés usuaris, menys ell, rebran el missatge que ell enviï
        socket.broadcast.emit('enviar-mensaje', payload) // A diferència de l'event que ha fet l'usuari, en aquest cas és l'io, llavors és de part del servidor. Io és quan el servidor de sockets envia el msg a tots els usuaris 

    })

}


module.exports = {
    socketController: socketController
}