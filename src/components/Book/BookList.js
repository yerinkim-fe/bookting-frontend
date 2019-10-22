import React, { Component } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import Modal from '../Modal/Modal';
import { getJwt } from '../../helpers';
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
    this.handleWishBook = this.handleWishBook.bind(this);
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

  handleSearch = async (page = 1) => {
    const { onAllBookDataLoad } = this.props;
    onAllBookDataLoad(0, true, this.state.value);
  };

  handleWishBook = async index => {
    const { books } = this.props;

    const selectedBook = books[index].lib_id;
    const result = await axios.post(`/api/books/wish`, {
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

    const bookList = books.map((item, index) => {
      const authors = item.authors.join(', ');

      return (
        <li key={index}>
          <a href={item.url} target='_blank'><img src={item.thumbnail} /></a>
          <div className='info'>
            {
              item.status ?
              <div className='status-on'>대여중</div> :
              <div className='status-off'>대여가능</div>
            }
            <span className='title'>{item.title}</span>
            <span className='authors'>
              {authors}
            </span>
            <span className='publisher'>
              {item.publisher}
            </span>
            <span className='pubdate'>
              {item.pubdate}
            </span>
            <span className='owner'>
              {item.owner.name}
            </span>
          </div>

          {
            !item.status &&
            <div className='buttons'>
              <button type='button' onClick={() => this.handleWishBook(index)}>담기</button>
            </div>
          }
        </li>
      );
    });

    return (
      <div className='container'>
        <div className='inner'>
          <div className='search'>
            <input type='text' onChange={this.handleValueChange} onKeyPress={this.handleKeyPress} placeholder='도서명, 저자명으로 검색하세요.' />
            <button type='button' onClick={this.handleSearch}><img src={iconSearch} /></button>
          </div>

          {
            bookList.length > 0 ?
            <ul className='book-list'>
              {bookList}
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
