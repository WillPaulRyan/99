const socketio = require('socket.io');
const {Deck} = require('./Deck');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./users');

function reset() {
	deck = [...Deck]
	shuffleDeck(deck);
}

function newGame(io, socket, user) {
  reset();
  // console.log(`New game in room ${user.room}`);
    
  // Get users in room & to each user...
  getRoomUsers(user.room).forEach((user) => {
		// ... emit 4 cards spliced from deck  
		io.to(user.id).emit('newGame', deck.splice(0,4)); 
	});  
}

function deal(socket) {
  // Check to see if cards left in deck
  if (deck.length) {
    socket.emit('deal', deck[0])
    deck.shift()
  } else {
    console.log('deck empty')
  }
}

function play(io, user, card) {
	io.to(user.room).emit('turnPlayed', ({ user, card }));
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

module.exports = {
  deal,
  newGame,
  play
};
