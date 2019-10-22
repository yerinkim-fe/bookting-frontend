import { combineReducers } from 'redux';
import * as types from "../constants/actionTypes";

const initialState = {
  // library: {
  //   data: [],
  //   isEnd: false
  // },
  // libraryAll: {
  //   data: [],
  //   isEnd: false
  // },
  book: {
    data: [],
    isEnd: false
  }
};

// export function bookReducer(state = initialState.library, action) {
//   switch(action.type) {
//     case types.LIBRARY_DATA_LOAD:
//       const books = {
//         data: state.data.concat(action.data),
//         isEnd: action.isEnd
//       }

//       return books;

//     default:
//       return initialState.library;
//   }
// }

// export function libraryAllReducer(state = initialState.libraryAll, action) {
//   switch(action.type) {
//     case types.LIBRARY_ALL_DATA_LOAD:
//       const books = {
//         data: state.data.concat(action.data),
//         isEnd: action.isEnd
//       }

//       return books;

//     default:
//       return initialState.libraryAll;
//   }
// }

export function bookReducer(state = initialState.book, action) {
  switch(action.type) {
    // case types.ALL_BOOK_DATA_LOAD:
    //   let data;

    //   if (action.isNew) {
    //     data = action.data;
    //   } else {
    //     data = state.data.concat(action.data);
    //   }

    //   const books = {
    //     data,
    //     isEnd: action.isEnd
    //   }

    //   return books;
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
      console.log('aaaa', state.data[action.index]);
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

export default combineReducers({
  book: bookReducer,
  // libraryAll: libraryAllReducer
});
