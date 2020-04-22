const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');
const { newGame, deal } = require('./utils/game')

const app = express();
const server = http.createServer(app);
const io = socketio(server);
// io.set('origins', 'http://127.0.0.1:3000')

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const botName = 'server';

// Run when client connects
io.on('connection', socket => {
  // console.log('New client connected')

  // 3 ways to emit messages:
  // socket.emit()  <- only goes to user
  // socket.broadcast.emit()  <- goes to everyone except user
  // io.emit()  <- goes to everyone

  socket.on('joinRoom', ({username, room}) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);
  })

  // Listen for chatMessage
  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message', formatMessage(user.username, msg))
  })

  // Listen for new game
  socket.on('newGameReq', () => {
    const user = getCurrentUser(socket.id);
    newGame(io, socket, user)
  })

  // Listen for client request for a card
  socket.on('dealReq', () => {
    deal(socket)
  })
  

  // Runs when client disconnects
  socket.on('disconnect', () => {
    // console.log('Client disconnected')
  });
});

const PORT = process.env.PORT || 1337;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
