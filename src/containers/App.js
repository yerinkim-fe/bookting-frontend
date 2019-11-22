import { connect } from 'react-redux';
import App from '../components/App/App';
import axiosInstance from '../api';
import { getJwt } from '../helpers';
import {
  getUser,
  allBookDataLoad,
  bookDataLoad,
  wishDataLoad,
  wishRemoveSuccess,
  bookUpdateSuccess,
  bookRemoveSuccess,
  chatDataLoad,
  myChatListLoad,
  sendMessage
} from '../actions';
import socket from '../socket';

const mapStateToProps = state => {
  return {
    currUser: state.user,
    allBookData: state.allBook.data,
    allBookIsEnd: state.allBook.isEnd,
    bookData: state.book.data,
    bookIsEnd: state.book.isEnd,
    wishData: state.wish.data,
    wishIsEnd: state.wish.isEnd,
    chatList: state.chatList,
    messages: state.chats.messages
  };
};

const mapDispatchToProps = dispatch => {
  socket.on('receivedMessage', (message, author) => {
    dispatch(sendMessage(message, author));
  });

  return {
    async onGetUser() {
      const res = await axiosInstance.get('/api/auth/getUser', {
        headers: { 'authorization': getJwt() }
      });
      dispatch(getUser(res.data.user));
    },
    async onAllBookDataLoad(page = 0, isNew = false, query = '') {
      const results = await axiosInstance.get(`/api/books?query=${query}&page=${page}`);
      dispatch(allBookDataLoad(results.data.books, results.data.isEnd, isNew));
    },
    async onMyBookDataLoad(page = 0, user_id, isNew = false) {
      const results = await axiosInstance.get(`/api/books/${user_id}?page=${page}`);
      dispatch(bookDataLoad(results.data.books, results.data.isEnd, isNew));
    },
    async onWishBookDataLoad(page = 0, user_id, isNew = false) {
      const results = await axiosInstance.get(`/api/books/wish/${user_id}?page=${page}`);
      dispatch(wishDataLoad(results.data.books, results.data.isEnd, isNew));
    },
    async onRemoveWish(selectedBook, wishIndex, bookIndex, user_id) {
      const res = await axiosInstance.delete(`/api/books/wish/${user_id}`, {
        data: { selectedBook }
      });

      if (res.data.result === 'ok') {
        dispatch(wishRemoveSuccess(wishIndex, bookIndex));
      }
    },
    async onUpdateBook(selectedBook, index, user_id) {
      const res = await axiosInstance.put(`/api/books/${user_id}`, {
        selectedBook
      });

      if (res.data.result === 'ok') {
        dispatch(bookUpdateSuccess(index));
      }
    },
    async onRemoveBook(selectedBook, index, user_id) {
      const res = await axiosInstance.delete(`/api/books/${user_id}`, {
        data: { selectedBook }
      });

      if (res.data.result === 'ok') {
        dispatch(bookRemoveSuccess(index));
      }
    },
    async onMyChatListLoad(user_id) {
      const res = await axiosInstance.get(`/api/chats/${user_id}/list`);
      dispatch(myChatListLoad(res.data.chats));
    },
    async onChatDataLoad(user, chat_id) {
      socket.emit('requestChat', chat_id);

      const res = await axiosInstance.get(`/api/chats/${chat_id}`);
      dispatch(chatDataLoad(res.data.chats, user));
    },
    async onSendMessage(message, author, chat_id) {
      socket.emit('sendMessage', message, author, chat_id);

      await axiosInstance.post(`/api/chats/message/${chat_id}`, {
        author,
        message
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
