const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected: ', socket.id);

  socket.on('message', (message) => {
    console.log('Message received: ', message);
    socket.broadcast.emit('message', message); // Send message to all other clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Signaling server running on http://localhost:${PORT}`));
