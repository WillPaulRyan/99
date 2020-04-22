const socketio = require('socket.io');
const {Deck} = require('./Deck');

function reset() {
	deck = [...Deck]
	shuffleDeck(deck);
}

function newGame(io, socket, user) {
  reset();
  
  let hand = deck.splice(0, 4);

  io.emit('message', {username: 'server', text: 'new game'})
  socket.emit('newGame', hand);
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

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

module.exports = {
  deal,
  newGame
};
