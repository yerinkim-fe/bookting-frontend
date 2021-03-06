import React, { Component } from 'react';
import { debounce } from 'lodash';
import axiosInstance from '../../api';
import BookItem from './BookItem';
import Modal from '../Modal/Modal';
import './Book.scss';
import iconSearch from '../../images/icon-search.png';

export default class MyBookNew extends Component {
  constructor(props) {
    super(props);

    this.pageIndex = 1;
    this.prevQeury = null;
    this.isNew = false;

    this.state = {
      value: '',
      message: '',
      books: [],
      isEnd: false,
      isModalShow: false
    };

    this.onScroll = debounce(this.onScroll, 200);
    this.handleAddBook = this.handleAddBook.bind(this);
    this.handleHideModalClick = this.handleHideModalClick.bind(this);
  }

  componentDidMount() {
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

  handleAddBook = async index => {
    const { match } = this.props;
    const { books } = this.state;

    const selectedBook = books[index];
    const result = await axiosInstance.post(`/api/books/new/${match.params.user_id}`, {
      selectedBook
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

  handleSearch = async (page = 1) => {
    const query = this.state.value;
    let books;
    const results = await axiosInstance.get(`/api/kakao/search?query=${query}&page=${page}`);

    if (query !== this.prevQeury) {
      books = results.data.books.items;
    } else {
      books = this.state.books.concat(results.data.books.items);
    }
    this.setState({
      books,
      isEnd: results.data.books.isEnd
    });
    this.prevQeury = query;
  };

  onScroll() {
    const { isEnd } = this.props;

    var doc = document.documentElement || document.body;
    let posScroll = doc.scrollHeight - doc.clientHeight - doc.scrollTop;

    if (!isEnd && posScroll < 200) {
      this.handleSearch(++this.pageIndex);
    }
  }

  render() {
    const { match } = this.props;
    const { books } = this.state;

    return (
      <div className='container'>
        <h2>도서등록</h2>

        <div className='inner'>

          <div className='search'>
            <input type='text' onChange={this.handleValueChange} onKeyPress={this.handleKeyPress} placeholder='도서명, 저자명으로 검색하세요.' />
            <button type='button' onClick={this.handleSearch}><img src={iconSearch} /></button>
          </div>

          {
            books.length > 0 ?
            <ul className='book-list'>
              <BookItem
                type='new'
                books={books}
                handleAddBook={this.handleAddBook}
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
