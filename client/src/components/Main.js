import React from "react";
import socketio from 'socket.io-client';
import Chat from './chat/Chat';
import Game from './game/Game';

import './Main.css'

export default class Main extends React.Component {
  state = {
    endpoint: "http://127.0.0.1:1337",
    socket: {},
    isLoaded: false
  }

  componentDidMount() {
    const {endpoint} = this.state;
    const socket = socketio(endpoint);
    this.setState({socket, isLoaded: true});
  }

  render() {
    const main = (
      <div id="main">
        <Chat socket={this.state.socket} />
        <Game socket={this.state.socket} />      
      </div>
    )

    return (
      <div>
        {this.state.isLoaded ? main : ''}
      </div>
    )
  }
}