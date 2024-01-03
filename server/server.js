require("dotenv").config();
require("./config/dbConnection");

const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const chatRoute = require('./routes/chatRoute');
const messageRoute = require('./routes/messageRoute');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/users', userRoute);
app.use('/api/chat', chatRoute);
app.use('/api/messages', messageRoute);

let onlineUsers = []


// socket.io
const { Server } = require('socket.io');
const io = new Server({ cors: "https://localhost:3000" });

io.on('connection', (socket) => {
 
    // listen to a connection
    socket.on('addNewUser', (userId) => {
        !onlineUsers.some(user => user.userId === userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id
            });

 
        io.emit('getOnlineUsers', onlineUsers);
    });

    // send message
    socket.on('sendMessage', (message) => {
        const user = onlineUsers.find(user => user.userId === message.recipientId);
        if(user){
            io.to(user.socketId).emit('getMessage', message);

        }



    });




    // Handle disconnections
    socket.on('disconnect', () => {

        onlineUsers = onlineUsers.filter(user => user.socketId != socket.id);
        io.emit('getOnlineUsers', onlineUsers);
    });



});

io.listen(4000);



const port = process.env.PORT || 5000
app.listen(5000, console.log(`Server is listening on port ${port}`));


