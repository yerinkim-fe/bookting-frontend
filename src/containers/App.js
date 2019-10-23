import { connect } from 'react-redux';
import App from '../components/App';
import axios from 'axios';
import {
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
    allBookData: state.allBook.data,
    allBookIsEnd: state.allBook.isEnd,
    bookData: state.book.data,
    bookIsEnd: state.book.isEnd,
    wishData: state.wish.data,
    wishIsEnd: state.wish.isEnd,
    chatList: state.chatList,
    user: state.chats.user,
    messages: state.chats.messages
  };
};

const mapDispatchToProps = dispatch => {
  socket.on('receivedMessage', (message, author) => {
    dispatch(sendMessage(message, author));
  });

  return {
    async onAllBookDataLoad(page = 0, isNew = false, query = '') {
      const results = await axios.get(`/api/books?query=${query}&page=${page}`);
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
    async onRemoveWish(selectedBook, wishIndex, bookIndex, user_id) {
      const res = await axios.delete(`/api/books/wish/${user_id}`, {
        data: { selectedBook }
      });

      if (res.data.result === 'ok') {
        dispatch(wishRemoveSuccess(wishIndex, bookIndex));
      }
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
    },
    async onMyChatListLoad(user_id) {
      const res = await axios.get(`/api/chats/${user_id}/list`);
      console.log(res);
      dispatch(myChatListLoad(res.data.chats));
    },
    async onChatDataLoad(user_id, chat_id) {
      socket.emit('requestChat', chat_id);

      const res = await axios.get(`/api/chats/${chat_id}?user_id=${user_id}`);
      dispatch(chatDataLoad(res.data.chats, res.data.user));
    },
    async onSendMessage(message, author, chat_id) {
      const res = await axios.post(`/api/chats/message/${chat_id}`, {
        author,
        message
      });

      socket.emit('sendMessage', message, res.data.user, chat_id);

    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
