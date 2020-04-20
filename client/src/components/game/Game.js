import React from "react";
import {Deck} from '../Deck';
import './Game.css'

export default class Game extends React.Component {
  state = {
    count: 0
  }

  handlePlay = (value) => {
    // console.log(value)
    this.setState((state) => ({
      count: state.count + value
    }));
}

  render() {
    const deck = Deck.map((card, i) => {
      return (
        <img className="card"
          key={i}
          src={card.img}
          alt=''
          value={2}
          onClick={() => this.handlePlay(card.value)}
        />
      )
    })

    return (
      <div id="game-container">
        <div id="game">
          <div id="deck">
            {deck}
          </div>
          <h2>{this.state.count}</h2>
        </div>
      </div>
    )
  }
}