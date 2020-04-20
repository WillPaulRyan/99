import React from "react";
import './Game.css'

export default class Game extends React.Component {
  state = {
    count: 0,
    hand: []
  }

  componentDidMount() {
    this.props.socket.emit('newGameReq')
    
    this.props.socket.on('deal', card => {
      this.setState((state) => ({
        hand: [...state.hand, card]
      }))

      // console.log(this.state.hand)
    })
  }

  handlePlay = (card) => {
    this.props.socket.emit('dealReq')
    // console.log(value)
    this.setState((state) => ({
      count: state.count + card.value,
      hand: state.hand.filter(word => word.id != card.id)
    }));
}

  render() {
    const hand = this.state.hand.map((card, i) => {
      return (
        <img className="card"
          key={i}
          src={card.img}
          alt=''
          onClick={() => this.handlePlay(card)}
        />
      )
    })

    return (
      <div id="game-container">
        <div id="game">
          <div id="hand">
            {hand}
          </div>
          <h2>{this.state.count}</h2>
        </div>
      </div>
    )
  }
}