import React from "react";
import socketio from 'socket.io-client';
import qs from 'query-string';
import Chat from './chat/Chat';
import Game from './game/Game';

import './Main.css'

export default class Main extends React.Component {
  state = {
    endpoint: "http://127.0.0.1:1337",
    socket: {},
    username: '',
    room: '',
    isLoaded: false
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketio(endpoint);
    
    const { username, table: room } = qs.parse(window.location.search)
    
    // Todo => Redirect client to index if there's no qs
    
    // console.log(username, room)
    socket.emit('joinRoom', { username, room })
    // socket.emit('joinRoom')
    
    this.setState({socket, username, room, isLoaded: true});
  }

  render() {
    const main = (
      <div id="main">
        <Chat socket={this.state.socket} username={this.state.username} room={this.state.room} />
        <Game socket={this.state.socket} username={this.state.username} room={this.state.room} />      
      </div>
    )

    return (
      <div>
        {this.state.isLoaded ? main : ''}
      </div>
    )
  }
}
