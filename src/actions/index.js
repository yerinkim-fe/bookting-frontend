import * as types from "../constants/actionTypes";

// export const myBookDataLoad = (data, isEnd) => ({
//   type: types.My_BOOK_DATA_LOAD,
//   data,
//   isEnd
// });

// export const libraryAllDataLoad = (data, isEnd) => ({
//   type: types.LIBRARY_ALL_DATA_LOAD,
//   data,
//   isEnd
// });



export const bookUpdateSuccess = (index) => ({
  type: types.BOOK_UPDATE_SUCCESS,
  index
});

export const bookRemoveSuccess = (index) => ({
  type: types.BOOK_REMOVE_SUCCESS,
  index
});

export const bookDataLoad = (data, isEnd, isNew) => ({
  type: types.BOOK_DATA_LOAD,
  data,
  isEnd,
  isNew
});
