import React, { Component } from 'react';
import { debounce } from 'lodash';
import axiosInstance from '../../api';
import BookItem from './BookItem';
import './Book.scss';

export default class WishList extends Component {
  constructor(props) {
    super(props);

    this.pageIndex = 0;

    this.state = {
      message: '',
      isModalShow: false
    };

    this.onScroll = debounce(this.onScroll, 200);
    this.handleRemoveWish = this.handleRemoveWish.bind(this);
    this.handleChat = this.handleChat.bind(this);
  }

  componentDidMount() {
    const { onWishBookDataLoad, match } = this.props;
    onWishBookDataLoad(0, match.params.user_id, true);

    window.addEventListener('scroll', () => { this.onScroll() });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => { this.onScroll() });
  }

  handleChat = async partnerId => {
    const { match, history } = this.props;

    const result = await axiosInstance.post(`/api/chats/${match.params.user_id}`, {
      partner_id: partnerId
    });

    if (result.data.result === 'ok') {
      history.push(`/chats/${result.data.chatRoomId}`);
    }
  };

  handleRemoveWish = async (wishId, wishIndex, bookIndex) => {
    const { match, onRemoveWish } = this.props;

    onRemoveWish(wishId, wishIndex, bookIndex, match.params.user_id);
  };

  handleHideModalClick() {
    this.setState({
      isModalShow: false
    });
  }

  onScroll() {
    const { isEnd, match } = this.props;

    var doc = document.documentElement || document.body;
    let posScroll = doc.scrollHeight - doc.clientHeight - doc.scrollTop;

    if (!isEnd && posScroll < 200) {
      this.props.onWishBookDataLoad(++this.pageIndex, match.params.user_id);
    }
  }

  render() {
    const { wishes } = this.props;

    const wishList = wishes.map((wishItem, wishIndex) => {

      return (
        wishItem.book.length !== 0 ?
        <li key={wishIndex}>
          <div className='owner'>
            <p className='owner-name'>{wishItem.owner.name}</p>
            <button type='button' onClick={() => this.handleChat(wishItem.owner._id)}>채팅하기</button>
          </div>
          <ul className='book-list'>
            <BookItem
              type='wish'
              books={wishItem.book}
              wishItem={wishItem}
              wishIndex={wishIndex}
              handleRemoveWish={this.handleRemoveWish}
            />
          </ul>
        </li>
        : null
      );
    });

    return (
      <div className='container'>
        <h2>위시리스트</h2>

        <div className='inner'>
          {
            wishList.length > 0 ?
            <ul className='wish-list'>
              {wishList}
            </ul> :
            <p className='no-data'>데이터가 없습니다.</p>
          }
        </div>
      </div>
    );
  }
}
