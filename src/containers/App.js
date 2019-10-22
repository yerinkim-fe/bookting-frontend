import { connect } from 'react-redux';
import App from '../components/App';
import axios from 'axios';
import { allBookDataLoad, bookDataLoad, wishDataLoad, bookUpdateSuccess, bookRemoveSuccess } from '../actions';

const mapStateToProps = state => {
  return {
    allBookData: state.allBook.data,
    allBookIsEnd: state.allBook.isEnd,
    bookData: state.book.data,
    bookIsEnd: state.book.isEnd,
    wishData: state.wish.data,
    wishIsEnd: state.wish.isEnd
  };
};

const mapDispatchToProps = dispatch => {
  return {
    async onAllBookDataLoad(page = 0, isNew = false, query = '') {
      const results = await axios.get(`/api/books?query=${query}&page=${page}`);

      console.log(results);

      // if (query !== prevQeury) {
      //   books = results.data.books.items;
      // } else {
      //   books = this.state.books.concat(results.data.books.items);
      // }
      // this.setState({
      //   books,
      //   isEnd: results.data.books.isEnd
      // });
      // prevQeury = query;


      dispatch(allBookDataLoad(results.data.books, results.data.isEnd, isNew));
    },

    async onMyBookDataLoad(page = 0, user_id, isNew = false) {
      const results = await axios.get(`/api/books/${user_id}?page=${page}`);
      dispatch(bookDataLoad(results.data.books, results.data.isEnd, isNew));
    },

    async onWishBookDataLoad(page = 0, user_id, isNew = false) {
      const results = await axios.get(`/api/books/wish/${user_id}?page=${page}`);
      dispatch(wishDataLoad(results.data.books, results.data.isEnd, isNew));
    },

    async onUpdateBook(selectedBook, index, user_id) {
      const res = await axios.put(`/api/books/${user_id}`, {
        selectedBook
      });

      if (res.data.result === 'ok') {
        dispatch(bookUpdateSuccess(index));
      }
    },

    async onRemoveBook(selectedBook, index, user_id) {
      const res = await axios.delete(`/api/books/${user_id}`, {
        data: { selectedBook }
      });

      if (res.data.result === 'ok') {
        dispatch(bookRemoveSuccess(index));
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
