import React from "react";
import './Chat.css'

export default class Chat extends React.Component {
  state = {
    messages: []
  }

  componentDidMount() {
    const chatMessages = document.getElementById('chat-messages');

    // Message from server
    this.props.socket.on('message', message => {
      // console.log(message)
      this.setState((state) => ({
        messages: [...state.messages, message]
      }));

    // console.log(this.state.messages)
    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
    })

  }

  // Messages submit
  handleSubmit(event) {
    event.preventDefault();

    // Get message text
    const msg = event.target.elements.msg.value

    // Emit message to server
    this.props.socket.emit('chatMessage', msg);

    // Clear input
    event.target.elements.msg.value = '';
    event.target.elements.msg.focus();  
  }

  render() {
    const messages = this.state.messages.map((message, i) => {
      return (
        <div className="message" key={i}>
          <p className="meta">{message.username}</p>
          <p className="text">{message.text}</p>
        </div>
      )
    });

    return (
      <div id="chat">
        <div id="chat-messages">
          {messages}
        </div>
        <form id="chat-form" onSubmit={this.handleSubmit.bind(this)}>
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autoComplete="off"
          />
          <button className="btn">Send</button>
        </form>
      </div>
    )
  }
}