import React, { Component } from 'react';
import { getDateFormatOfChat } from '../../utils';

export default class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.userId = localStorage.getItem('id');

    this.state = {
      value: ''
    };

    this.messagesEndRef = React.createRef(null);
  }


  scrollToBottom = () => {
    this.messagesEndRef.current.scrollTop = this.messagesEndRef.current.scrollHeight;
  };


  componentDidMount() {
    this.scrollToBottom();
    const { onChatDataLoad, match } = this.props;
    onChatDataLoad(this.userId, match.params.chat_id);
  }

  handleValueChange = e => {
    const { value } = e.target;
    this.setState({
      value
    });
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSend();
    }
  }

  handleSend = () => {
    const { onSendMessage, match } = this.props;

    if (!this.state.value) return;

    onSendMessage(this.state.value, this.userId, match.params.chat_id);
    this.setState({
      value: ''
    });
  };

  render() {
    const { messages, user } = this.props;

    const msgThread = messages.map((item, index) => {
      return (
        <li key={index} className={(user._id === item.author._id) ? 'me' : 'you'}>
          <img src={item.author.photo_url} />
          <div className='user'>
            <p className='username'>{item.author.name}</p>
            <p className='text'>{item.message}</p>
          </div>
          <span className='time'>{getDateFormatOfChat(item.created_at)}</span>
        </li>
      );
    });

    return (
      <div className='container'>
        <h2>채팅</h2>

        <ul className='msg-thread' ref={this.messagesEndRef}>
          {msgThread}
        </ul>

        <div className='input-message'>
          <input
            type='text'
            value={this.state.value}
            onChange={this.handleValueChange}
            onKeyPress={this.handleKeyPress}
          />
          <button type='button' className='send-button' onClick={this.handleSend}>전송</button>
        </div>
      </div>
    );
  }
}
