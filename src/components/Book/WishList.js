import React, { Component } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import Modal from '../Modal/Modal';
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
    this.handleWishBook = this.handleWishBook.bind(this);
  }

  componentDidMount() {
    const { onWishBookDataLoad, match } = this.props;
    onWishBookDataLoad(0, match.params.user_id, true);

    window.addEventListener('scroll', () => { this.onScroll() });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => { this.onScroll() });
  }

  handleWishBook = async index => {
    const { books, match } = this.props;

    const selectedBook = books[index];
    const result = await axios.post(`/api/books/wish/${match.params.user_id}`, {
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

  onScroll() {
    const { isEnd, match } = this.props;

    var doc = document.documentElement || document.body;
    let posScroll = doc.scrollHeight - doc.clientHeight - doc.scrollTop;

    if (!isEnd && posScroll < 200) {
      this.props.onWishBookDataLoad(++this.pageIndex, match.params.user_id);
    }
  }

  render() {
    const { books } = this.props;

    console.log(books);

    // const bookList = books.map((item, index) => {
    //   const authors = item.authors.join(', ');

    //   return (
    //     <li key={index}>
    //       <p className='owner'>{item.user.name}</p>
    //       <a href={item.url} target='_blank'><img src={item.thumbnail} /></a>
    //       <div className='info'>
    //         <span className='title'>{item.title}</span>
    //         <span className='authors'>
    //           {authors}
    //         </span>
    //         <span className='publisher'>
    //           {item.publisher}
    //         </span>
    //         <span className='pubdate'>
    //           {item.pubdate}
    //         </span>
    //       </div>

    //       {/* <div className='buttons'>
    //         <button type='button' className='reg-button' onClick={() => this.handleWishBook(index)}>담기</button>
    //       </div> */}
    //     </li>
    //   );
    // });

    return (
      <div className='container'>
        {/* {
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
        } */}
      </div>
    );
  }
}
