import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { getDateFormat } from '../../utils';
import './Book.scss';
import addBook from '../../images/btn-add-book.png';

export default class MyBook extends Component {
  constructor(props) {
    super(props);

    this.pageIndex = 0;

    this.onScroll = debounce(this.onScroll, 200);
    this.handleRemoveBook = this.handleRemoveBook.bind(this);
    this.handleUpdateBook = this.handleUpdateBook.bind(this);
  }

  componentDidMount() {
    const { onMyBookDataLoad, match } = this.props;
    onMyBookDataLoad(0, match.params.user_id, true);

    window.addEventListener('scroll', () => { this.onScroll() });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => { this.onScroll() });
  }

  handleUpdateBook = async index => {
    const { books, match, onUpdateBook } = this.props;
    const id = books[index]._id;

    onUpdateBook(id, index, match.params.user_id);
  };

  handleRemoveBook = async index => {
    const { books, match, onRemoveBook } = this.props;
    const id = books[index]._id;

    onRemoveBook(id, index, match.params.user_id);
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
      this.props.onMyBookDataLoad(++this.pageIndex, match.params.user_id);
    }
  }

  render() {
    const { books, match } = this.props;

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
              {getDateFormat(item.pubdate)}
            </span>
          </div>

          <div className='buttons'>
            {
              item.status ?
              <button type='button' className='toggle-button-on' onClick={() => this.handleUpdateBook(index)}>대여중</button>
              :
              <button type='button' className='toggle-button-off' onClick={() => this.handleUpdateBook(index)}>대여가능</button>
            }

            <button type='button' onClick={() => this.handleRemoveBook(index)}>삭제</button>
          </div>
        </li>
      );
    });

    return (
      <div className='container'>
        <h2>내서재</h2>

        <div className='inner'>
          {
            bookList.length > 0 ?
            <ul className='book-list'>
              {bookList}
            </ul> :
            <p className='no-data'>데이터가 없습니다.</p>
          }

          <Link to={`/books/new/${match.params.user_id}`}><img src={addBook} className='add-book-button' /></Link>
        </div>
      </div>
    );
  }
}
