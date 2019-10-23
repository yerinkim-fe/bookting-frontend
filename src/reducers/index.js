import { combineReducers } from 'redux';
import * as types from "../constants/actionTypes";

const initialState = {
  allBook: {
    data: [],
    isEnd: false
  },
  book: {
    data: [],
    isEnd: false
  },
  wish: {
    data: [],
    isEnd: false
  },
  chatList: [],
  chats: {
    messages: [],
    user: {}
  }
};

export function allBookReducer(state = initialState.allBook, action) {
  switch(action.type) {
    case types.ALL_BOOK_DATA_LOAD:
      let data;

      if (action.isNew) {
        data = action.data;
      } else {
        data = state.data.concat(action.data);
      }

      const books = {
        data,
        isEnd: action.isEnd
      }

      return books;

    default:
      return state;
  }
}

export function bookReducer(state = initialState.book, action) {
  switch(action.type) {
    case types.BOOK_DATA_LOAD:
      let data;

      if (action.isNew) {
        data = action.data;
      } else {
        data = state.data.concat(action.data);
      }

      const books = {
        data,
        isEnd: action.isEnd
      }

      return books;

    case types.BOOK_UPDATE_SUCCESS:
      const updateDoc = state.data.slice();
      updateDoc[action.index].status = !updateDoc[action.index].status;

      return {
        ...state,
        data: [
          ...updateDoc
        ]
      }

    case types.BOOK_REMOVE_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data.slice(0, action.index),
          ...state.data.slice(action.index + 1)
        ]
      }

    default:
      return state;
  }
}

export function wishReducer(state = initialState.wish, action) {
  switch(action.type) {
    case types.WISH_DATA_LOAD:
      let data;

      if (action.isNew) {
        data = action.data;
      } else {
        data = state.data.concat(action.data);
      }

      const books = {
        data,
        isEnd: action.isEnd
      }

      return books;

    case types.WISH_REMOVE_SUCCESS:
      console.log('w', state);

      let stateCopied = state.data.slice();

      stateCopied[action.wishIndex].book.splice(action.bookIndex, 1);

      return {
        ...state,
        data: [
          ...stateCopied
        ]
      }

    default:
      return state;
  }
}

export function chatListReducer(state = initialState.chatList, action) {
  switch(action.type) {
    case types.MY_CHAT_LIST_LOAD:
      return action.list;

    default:
      return state;
  }
}

export function chatReducer(state = initialState.chats, action) {
  switch(action.type) {
    case types.CHAT_DATA_LOAD:
      const chats = {
        messages: action.messages,
        user: action.user
      }

      return chats;

    case types.SEND_MESSAGE:
      const messages = state.messages.slice();

      const newMessage = {
        author: action.author,
        created_at: new Date(),
        updated_at: new Date(),
        message: action.message
      }

      messages.push(newMessage);

      return {
        ...state,
        messages
      };

    default:
      return state;
  }
}

export default combineReducers({
  allBook: allBookReducer,
  book: bookReducer,
  wish: wishReducer,
  chatList: chatListReducer,
  chats: chatReducer
});
