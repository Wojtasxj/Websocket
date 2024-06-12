const express = require('express');
const socket = require('socket.io');
const path = require('path');

const app = express();
const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});
const io = socket(server);
const users = []
const messages = [];

app.use(express.static(path.join(__dirname, 'client')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Handle new socket connections
io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
  
    // Handle incoming messages
    socket.on('message', (message) => {
      console.log('Oh, I\'ve got something from ' + socket.id);
      messages.push(message);
      socket.broadcast.emit('message', message);
    });
  
    // Handle user login
    socket.on('login', (name) => {
      // Prevent duplicate usernames
      if (users.find(user => user.name === name)) {
        socket.emit('loginError', 'Username already taken');
        return;
      }
  
      const user = { name, id: socket.id };
      users.push(user);
      io.emit('userList', users);
      socket.broadcast.emit('newUser', name);

    });
  
    // Handle user disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      const index = users.findIndex((user) => user.id === socket.id);
      if (index !== -1) {
        const { name } = users[index];
        users.splice(index, 1);
        io.emit('userList', users);
        io.emit('removeUser', name);
      }
    });
  });