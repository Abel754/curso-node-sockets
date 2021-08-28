
// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')

const socket = io(); // Afegint aquesta línea, ja establim la connexió amb tot l'afegit a server.js


socket.on('connect', () => {

    console.log('conectado');

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';

});

socket.on('disconnect', () => {

    console.log('desconectado');

    lblOffline.style.display = '';
    lblOnline.style.display = 'none';

});

socket.on('enviar-mensaje', (payload) => { // Ja que des del server, emetem amb (emit) una funció enviar-mensaje, ara la podem cridar des de la part del client. Igual que passa més abaix quan emetem des de la part del client i la cridem des de la part del servidor
    console.log(payload)
}) 


btnEnviar.addEventListener('click', () => {

    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '11',
        fecha: new Date().getTime()
    }
    
    socket.emit('enviar-mensaje', payload, (id) => { // utilitza la funció emit per enviar el missatge que ha escrit l'usuari que serà recollida des de server.js

        console.log('Desde el servidor', id)

    });

})