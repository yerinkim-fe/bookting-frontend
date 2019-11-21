import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import BookItem from './BookItem';
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

    return (
      <div className='container'>
        <h2>내서재</h2>

        <div className='inner'>
          {
            books.length > 0 ?
            <ul className='book-list'>
              <BookItem
                type='my'
                books={books}
                handleUpdateBook={this.handleUpdateBook}
                handleRemoveBook={this.handleRemoveBook}
              />
            </ul> :
            <p className='no-data'>데이터가 없습니다.</p>
          }

          <Link to={`/books/new/${match.params.user_id}`}><img src={addBook} className='add-book-button' /></Link>
        </div>
      </div>
    );
  }
}
