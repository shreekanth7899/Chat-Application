//Imports of Required Dependencies.

const express = require('express');
const path =  require('path');
const { Socket } = require('socket.io');
const app = express();
const db = require('./db');

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

    socket.on('message', (data) => {
        console.log(data)
        socket.broadcast.emit('chat-message', data)
    })

    socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data)
    })
    socket.on('message', (data) => {
        const { name, message, dateTime } = data;
        const query = `INSERT INTO users (name, message, datetime) VALUES (?, ?, ?)`;
        const values = [name, message, dateTime];
    
        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Error storing user information:', err);
                return;
            }
            console.log('User information stored in the database');
        });
    });
}

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({ storage: storage });
// app.post('/upload', upload.array('files'), (req, res) => {
//     // Files are uploaded successfully
//     res.sendStatus(200);
// });

// add another page using app.get function 
app.get('/options/backup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'options', 'backup.html'));
});