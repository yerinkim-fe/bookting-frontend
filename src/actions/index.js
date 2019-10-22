import * as types from "../constants/actionTypes";

export const bookUpdateSuccess = (index) => ({
  type: types.BOOK_UPDATE_SUCCESS,
  index
});

export const bookRemoveSuccess = (index) => ({
  type: types.BOOK_REMOVE_SUCCESS,
  index
});

export const allBookDataLoad = (data, isEnd, isNew) => ({
  type: types.ALL_BOOK_DATA_LOAD,
  data,
  isEnd,
  isNew
});

export const bookDataLoad = (data, isEnd, isNew) => ({
  type: types.BOOK_DATA_LOAD,
  data,
  isEnd,
  isNew
});

export const wishDataLoad = (data, isEnd, isNew) => ({
  type: types.WISH_DATA_LOAD,
  data,
  isEnd,
  isNew
});
