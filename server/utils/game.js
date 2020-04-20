const socketio = require('socket.io');
const {Deck} = require('./Deck');

let deck = Deck

shuffleDeck(deck)

function newGame(io, user) {
  let deck = Deck
  shuffleDeck(deck)

  io.emit('message', {username: 'server', text: 'new game'})
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