/**
 * ************************************
 *
 * @module Chat.js
 * @author Bruce
 * @date 06/17/2019
 * @description Renders chat messages to a habit
 *
 * ************************************
 */
import React, { Component } from 'react';

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
    };
  }
  /**
   * Maps over array of messages and renders each message
   *
   * @param {array} messages - An array of chat message objects
   * @return {array} array of JSX messages to be rendered
   *
   * @example
   * renderChatMessages(messages)
   */
  renderChatMessages = messages => {
    return messages.map(message => {
      return (
        <div>
          <p>{message.author}</p>
          <p>{message.text}</p>
        </div>
      );
    });
  };

  onMessageChange = event => {
    this.setState({
      message: event.target.value,
    });
  };

  handleMessageSubmit = event => {
    const { message } = this.state;
    const { sendMessage, username, habitIndex } = this.props;
    event.preventDefault();
    sendMessage(message, username, habitIndex);
  };
  render() {
    const { messages } = this.props;
    return (
      <form onSubmit={this.handleMessageSubmit}>
        {this.renderChatMessages(messages)}
        <input
          type="text"
          className="chat-input"
          placeholder="Enter your message 🐢"
          onChange={this.onMessageChange}
        />
      </form>
    );
  }
}
