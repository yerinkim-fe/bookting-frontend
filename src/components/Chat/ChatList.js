import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Chat.scss';
import getDateFormat from '../../utils';

export default class ChatRoom extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { onMyChatListLoad, match } = this.props;
    onMyChatListLoad(match.params.user_id);
  }

  render() {
    const { chatList } = this.props;

    const list = chatList.map((item, index) => {
      return (
        <li key={index}>
          <Link to={`/chats/${item._id}`}>
            <img src={item.messages[0].author.photo_url} />
            <div className='user'>
              <p className='username'>{item.messages[0].author.name}</p>
              <p className='last-msg'><span>{item.messages[0].message}</span></p>
            </div>
            <span className='last-created-at'>{getDateFormat(item.messages[0].created_at)}</span>
          </Link>
        </li>
      );
    });

    return (
      <div className='container'>
        <h2>채팅</h2>

        <ul className='chat-list'>
          {list}
        </ul>
      </div>
    );
  }
}
