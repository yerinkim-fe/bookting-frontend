import { connect } from 'react-redux';
import App from '../components/App';
import axios from 'axios';
import { bookDataLoad, bookUpdateSuccess, bookRemoveSuccess } from '../actions';

const mapStateToProps = state => {
  return {
    bookData: state.book.data,
    bookIsEnd: state.book.isEnd,
    // library: state.library.data,
    // libraryIsEnd: state.library.isEnd,
    // libraryAll: state.libraryAll.data,
    // libraryAllIsEnd: state.libraryAll.isEnd,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onLoad() {
    //   dispatch(loadingOn());

    //   getMeData().then(data => {
    //     dispatch(meDataLoad(data));
    //   });

    //   getChatData().then(data => {
    //     dispatch(chatDataLoad(data));
    //   });
    // },

    async onBookDataLoad(page = 0, isNew = false) {
      const results = await axios.get(`/api/books?page=${page}`);
      console.log('user', page, results);
      dispatch(bookDataLoad(results.data.books, results.data.isEnd, isNew));
    },

    async onMyBookDataLoad(page = 0, user_id, isNew = false) {
      const results = await axios.get(`/api/books/${user_id}?page=${page}`);
      console.log('user', page, results);
      dispatch(bookDataLoad(results.data.books, results.data.isEnd, isNew));
    },

    async onWishBookDataLoad(page = 0, user_id, isNew = false) {
      const results = await axios.get(`/api/books/wish/${user_id}?page=${page}`);
      console.log('user', page, results);
      dispatch(bookDataLoad(results.data.books, results.data.isEnd, isNew));
    },

    // async onLibraryAllLoad(page = 0) {
    //   const books = await axios.get(`/api/library?page=${page}`);
    //   console.log('all', page);
    //   dispatch(libraryAllDataLoad(books.data.data, books.data.isEnd));
    // },

    // async onLibraryUpdate(selectedBooks, user_id) {
    //   await axios.put(`/api/library/${user_id}`, {
    //     selectedBooks
    //   });

    //   const books = await axios.get(`/api/library/${user_id}?page=0`);
    //   dispatch(libraryDataLoad(books.data.data, books.data.isEnd));
    // },

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




      // if (result.data.result === 'ok') {
      //   this.setState({
      //     isModalShow: true
      //   });
      // }

      // if (data.data.result === 'ok') {
      //   const books = await axios.get(`/api/library/${user_id}?page=0`);

      //   dispatch(libraryDataLoad(books.data.data));
      // }
    },

    // async onBookApiSearch(query, page) {
    //   isNew = (query !== prevQeury) ? true : false;
    //   const results = await axios.get(`/api/kakao/search?query=${query}&page=${page}`);
    //   dispatch(bookDataLoad(results.data.books.items, results.data.books.isEnd, isNew));
    //   prevQeury = query;
    // }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
