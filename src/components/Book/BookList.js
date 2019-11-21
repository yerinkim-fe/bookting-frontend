import React, { Component } from 'react';
import { debounce } from 'lodash';
import axiosInstance from '../../api';
import { getJwt } from '../../helpers';
import BookItem from './BookItem';
import Modal from '../Modal/Modal';
import './Book.scss';
import iconSearch from '../../images/icon-search.png';

export default class BookList extends Component {
  constructor(props) {
    super(props);

    this.pageIndex = 0;

    this.state = {
      value: '',
      message: '',
      isModalShow: false
    };

    this.onScroll = debounce(this.onScroll, 200);
    this.handleHideModalClick = this.handleHideModalClick.bind(this);
  }

  componentDidMount() {
    const { onAllBookDataLoad } = this.props;
    onAllBookDataLoad(0, true);

    window.addEventListener('scroll', () => { this.onScroll() });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => { this.onScroll() });
  }

  handleValueChange = e => {
    const { value } = e.target;
    this.setState({
      value
    });
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  }

  handleSearch = (page = 1) => {
    const { onAllBookDataLoad } = this.props;
    onAllBookDataLoad(0, true, this.state.value);
  };

  handleWishBook = async index => {
    const { books } = this.props;

    const selectedBook = books[index].lib_id;
    const result = await axiosInstance.post(`/api/books/wish`, {
      selectedBook
    }, {
      headers: { 'authorization': getJwt() }
    });

    if (result.data.result === 'ok') {
      this.setState({
        message: result.data.message,
        isModalShow: true
      });
    }
  };

  handleHideModalClick() {
    this.setState({
      isModalShow: false
    });
  }

  onScroll() {
    const { isEnd } = this.props;

    var doc = document.documentElement || document.body;
    let posScroll = doc.scrollHeight - doc.clientHeight - doc.scrollTop;

    if (!isEnd && posScroll < 200) {
      this.props.onAllBookDataLoad(++this.pageIndex, false, this.state.value);
    }
  }

  render() {
    const { books } = this.props;

    return (
      <div className='container'>
        <div className='inner'>
          <div className='search'>
            <input type='text' onChange={this.handleValueChange} onKeyPress={this.handleKeyPress} placeholder='도서명, 저자명으로 검색하세요.' />
            <button type='button' className='search-button' onClick={this.handleSearch}><img src={iconSearch} /></button>
          </div>

          {
            books.length > 0 ?
            <ul className='book-list'>
              <BookItem
                type='all'
                books={books}
                handleWishBook={this.handleWishBook}
              />
            </ul> :
            <p className='no-data'>데이터가 없습니다.</p>
          }

          {
            this.state.isModalShow &&
            <Modal>
              <div className='wrap'>
                <p className='message'>{this.state.message}</p>
                <button type='button' onClick={this.handleHideModalClick}>확인</button>
              </div>
            </Modal>
          }
        </div>
      </div>
    );
  }
}
