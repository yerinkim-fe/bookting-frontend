import React, { Component } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import Modal from '../Modal/Modal';
import { getJwt } from '../../helpers';
import './Book.scss';

export default class BookList extends Component {
  constructor(props) {
    super(props);

    this.pageIndex = 0;

    this.state = {
      message: '',
      isModalShow: false
    };

    this.onScroll = debounce(this.onScroll, 200);
    this.handleWishBook = this.handleWishBook.bind(this);
    this.handleHideModalClick = this.handleHideModalClick.bind(this);
  }

  componentDidMount() {
    const { onBookDataLoad } = this.props;
    onBookDataLoad(0, true);

    window.addEventListener('scroll', () => { this.onScroll() });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => { this.onScroll() });
  }

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
      this.props.onBookDataLoad(++this.pageIndex);
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
          </div>

          <div className='buttons'>
            <button type='button' className='reg-button' onClick={() => this.handleWishBook(index)}>담기</button>
          </div>
        </li>
      );
    });

    return (
      <div className='container'>
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
    );
  }
}
