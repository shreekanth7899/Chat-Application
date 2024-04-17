//Imports of Required Dependencies.

const express = require('express')
const path =  require('path');
const { Socket } = require('socket.io');
const app = express();

const PORT = process.env.PORT || 4000 //const PORT = 4000 

const server = app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
const io = require('socket.io')(server)


// Path joining to Use the Public directory.

app.use(express.static(path.join(__dirname, 'public')));

// Socket.io Connection details.
io.on('connection', (Socket) => {
    console.log(Socket.id)
})

let socketConnected = new Set()
io.on('connection', onConnected)

function onConnected(socket) {
    console.log(socket.id)
    socketConnected.add(socket.id)

    io.emit('clients-total', socketConnected.size)

    socket.on('disconnect', () => {
        console.log('socket disconnected', socket.id)
        socketConnected.delete(socket.id)
        io.emit('clients-total', socketConnected.size)
    })
}