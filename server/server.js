const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
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
    // socket.emit emits event to single connection
    // socket.emit('newMessage', {
    //     from: 'mike',
    //     text: 'What is going on?'
    // });

    //socket.emit from Admin

    // socket.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'Welcome to the chat app',
    //     createdAt: new Date().getTime()
    // });

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    //socket.broadcast.emit from Admin
    // socket.broadcast.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'New user joined',
    //     createdAt: new Date().getTime()
    // });

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        //io.emit emits the same event to all connections
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
        io.emit('newMessage', generateMessage(message.from, message.text));
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from client');
    });
});



server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});