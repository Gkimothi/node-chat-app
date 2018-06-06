const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
// let server = http.createServer((req, res) => {

// });
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

// app.listen(port, () => {
//     console.log(`Server is up on port ${port}`);
// });

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'mike',
        text: 'What is going on?'
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from client');
    });
});



server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});