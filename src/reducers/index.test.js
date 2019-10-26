import { allBookReducer, bookReducer, wishReducer, chatListReducer, chatReducer } from './index';
import * as types from "../constants/actionTypes";

describe('allBook reducers', () => {
  const initialState = {
    allBook: {
      data: [],
      isEnd: false
    }
  };

  it('should provide the initial state', () => {
    expect(allBookReducer(initialState.allBook, {})).toEqual(initialState.allBook);
  });

  it('should handle ALL_BOOK_DATA_LOAD action', () => {
    expect(allBookReducer(initialState.allBook, { type: types.ALL_BOOK_DATA_LOAD, data: [], isEnd: true })).toEqual({ data: [], isEnd: true });
  });
});

describe('book reducers', () => {
  const initialState = {
    book: {
      data: [],
      isEnd: false
    }
  };

  it('should provide the initial state', () => {
    expect(bookReducer(initialState.book, {})).toEqual(initialState.book);
  });

  it('should handle BOOK_DATA_LOAD action', () => {
    expect(bookReducer(initialState.book, { type: types.BOOK_DATA_LOAD, data: [], isEnd: true })).toEqual({ data: [], isEnd: true });
  });

  it('should handle BOOK_UPDATE_SUCCESS action', () => {
    const fakeState = {
      data: [{
        authors: ["김영빈"],
        length: 1,
        isbn: "1185651020",
        lib_id: "5dac24566f816d03e1c00a14",
        owner: {
          name: "Yerin Kim",
          photo_url: "https://lh6.googleusercontent.com/-sQYgUyFWyEI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reRWoHsH_UcwkGdF4OSbMrJL7Ni_Q/photo.jpg",
          _id: "5dac1a88a00d74b6134a29b4",
        },
        pubdate: "2014-6-10 00:00:00",
        status: false,
        thumbnail: "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1621016%3Ftimestamp%3D20190131080720",
        title: "열두 달 저장음식",
        url: "https://search.daum.net/search?w=bookpage&bookId=1621016&q=%EC%97%B4%EB%91%90+%EB%8B%AC+%EC%A0%80%EC%9E%A5%EC%9D%8C%EC%8B%9D",
        _id: "5dac24566f816d03e1c00a13"
      }],
      isEnd: false
    }

    const newState = bookReducer(fakeState, { type: types.BOOK_UPDATE_SUCCESS, index: 0 });

    expect(newState.data[0].status).toEqual(true);
  });

  it('should handle BOOK_REMOVE_SUCCESS action', () => {
    const fakeState = {
      data: [{
        authors: ["김영빈"],
        length: 1,
        isbn: "1185651020",
        lib_id: "5dac24566f816d03e1c00a14",
        owner: {
          name: "Yerin Kim",
          photo_url: "https://lh6.googleusercontent.com/-sQYgUyFWyEI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reRWoHsH_UcwkGdF4OSbMrJL7Ni_Q/photo.jpg",
          _id: "5dac1a88a00d74b6134a29b4",
        },
        pubdate: "2014-6-10 00:00:00",
        status: false,
        thumbnail: "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1621016%3Ftimestamp%3D20190131080720",
        title: "열두 달 저장음식",
        url: "https://search.daum.net/search?w=bookpage&bookId=1621016&q=%EC%97%B4%EB%91%90+%EB%8B%AC+%EC%A0%80%EC%9E%A5%EC%9D%8C%EC%8B%9D",
        _id: "5dac24566f816d03e1c00a13"
      }],
      isEnd: false
    }

    const newState = bookReducer(fakeState, { type: types.BOOK_REMOVE_SUCCESS, index: 0 });

    expect(newState.data.length).toEqual(0);
  });
});

describe('wish reducers', () => {
  const initialState = {
    wish: {
      data: [],
      isEnd: false
    }
  };

  it('should provide the initial state', () => {
    expect(wishReducer(initialState.wish, {})).toEqual(initialState.wish);
  });

  it('should handle WISH_DATA_LOAD action', () => {
    expect(wishReducer(initialState.wish, { type: types.WISH_DATA_LOAD, data: [], isEnd: true })).toEqual({ data: [], isEnd: true });
  });

  it('should handle WISH_REMOVE_SUCCESS action', () => {
    const fakeState = {
      data: [{
        owner: {},
        wishId: '5dadaeefc8b6f81eda4c9a96',
        book: [{
          authors: ["김영빈"],
          isbn: "1185651020",
          pubdate: "2014-6-10 00:00:00",
          thumbnail: "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1621016%3Ftimestamp%3D20190131080720",
          title: "열두 달 저장음식",
          url: "https://search.daum.net/search?w=bookpage&bookId=1621016&q=%EC%97%B4%EB%91%90+%EB%8B%AC+%EC%A0%80%EC%9E%A5%EC%9D%8C%EC%8B%9D",
          _id: "5dac24566f816d03e1c00a13"
        }]
      }],
      isEnd: false
    }

    const newState = wishReducer(fakeState, { type: types.WISH_REMOVE_SUCCESS, wishIndex: 0, bookIndex: 0  });

    expect(newState.data[0].book.length).toEqual(0);
  });
});

describe('chatList reducers', () => {
  const initialState = {
    chatList: []
  };

  it('should provide the initial state', () => {
    expect(chatListReducer(initialState.chatList, {})).toEqual(initialState.chatList);
  });

  it('should handle MY_CHAT_LIST_LOAD action', () => {
    expect(chatListReducer(initialState.chatList, { type: types.MY_CHAT_LIST_LOAD, list: [] })).toEqual([]);
  });
});

describe('chat reducers', () => {
  const initialState = {
    chats: {
      messages: [],
      user: {}
    }
  };

  it('should provide the initial state', () => {
    expect(chatReducer(initialState.chats, {})).toEqual(initialState.chats);
  });

  it('should handle CHAT_DATA_LOAD action', () => {
    expect(chatReducer(initialState.chatList, { type: types.CHAT_DATA_LOAD, messages: [], user: {} })).toEqual({ messages: [], user: {} });
  });

  it('should handle SEND_MESSAGE action', () => {
    const fakeState = {
      messages: [{
        author: {_id: "5db02bfc46fbc56d30a6c005", name: "김준모", photo_url: "https://graph.facebook.com/522013818375614/picture"},
        created_at: "2019-10-23T11:32:10.804Z",
        message: "하하하",
        updated_at: "2019-10-23T11:32:10.804Z",
        _id: "5db03a3a2fdf556ef83bcc8f"
      }],
      user: {
        name: "Yerin Kim",
        photo_url: "https://lh6.googleusercontent.com/-sQYgUyFWyEI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reRWoHsH_UcwkGdF4OSbMrJL7Ni_Q/photo.jpg",
        _id: "5dac1a88a00d74b6134a29b4"
      }
    };

    const newState = chatReducer(fakeState, { type: types.SEND_MESSAGE, message: '책빌려주세요', author: {} });

    expect(newState.messages.length).toEqual(2);
  });
});
