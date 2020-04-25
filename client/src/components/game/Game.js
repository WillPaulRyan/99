import React from "react";
import './Game.css'

export default class Game extends React.Component {
  state = {
		currentUser: 0,
    count: 0,
    hand: [],
    users: [],
    discard: {img: './cards/discard.png'},
    nextTurn: 0,
    isClockwise: true
  }

  componentDidMount() {
    this.props.socket.emit('newGameReq')
    
    this.props.socket.on('currentUser', currentUser => {
			this.setState({currentUser});
		});
    
    this.props.socket.on('newGame', hand => {
			console.log("New game");
			this.setState((state) => ({
				count: 0,
        hand,
        discard: {img: './cards/discard.png'}
			}))
		})
    
    this.props.socket.on('deal', card => {
      this.setState((state) => ({
        hand: [...state.hand, card]
      }))

      // console.log(this.state.hand)
    })
    
    this.props.socket.on('turnPlayed', ({ user, card }) => {
			// console.log(card);
			
			this.setState((state) => ({
				count: state.count + card.value,
				discard: card
      }));
      
      console.log(this.state.currentUser)
      console.log(this.state.users)
		});

    this.props.socket.on('roomUsers', ({ room, users }) => {
      this.setState({users});
    })
  }

  handlePlay = (card) => {
    console.log(this.state.users)
    console.log(this.state.nextTurn)
    console.log(this.state.currentUser)
    console.log(this.state.users[this.state.nextTurn].id === this.state.currentUser.id)


    if(this.state.users[this.state.nextTurn].id === this.state.currentUser.id) {
      this.props.socket.emit('play', card)
      // console.log(value)

      this.setState((state) => ({
        hand: state.hand.filter(word => word.id !== card.id)
      }));
    }
	}

  render() {
		const currentUser = this.state.currentUser
		const users = this.state.users
			// .filter(user => user.id !== this.state.currentUser.id)
			.map((user, i) => {
			return (
				<div className="user" key={i}>
					<p id={user.id === currentUser.id ? 'current-user' : ''}>{user.username}</p>
				</div>
			)
		});
		
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
					<div id="users-container">{users}</div>
					<div id="game-state">
						<img className="card" 
							src={this.state.discard.img} 
							alt="Discard pile"
						/>
						<h2 id="count">{this.state.count}</h2>					
					</div>
        </div>
				<div id="hand">
					{hand}
				</div>
      </div>
    )
  }
}
