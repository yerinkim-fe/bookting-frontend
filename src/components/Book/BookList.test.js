import React from 'react';
import { shallow, mount } from 'enzyme';
import BookList from './BookList';

describe('<BookList />', () => {
  const props = {
    books: [{
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
      publisher: "원타임즈",
      thumbnail: "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1621016%3Ftimestamp%3D20190131080720",
      title: "열두 달 저장음식",
      url: "https://search.daum.net/search?w=bookpage&bookId=1621016&q=%EC%97%B4%EB%91%90+%EB%8B%AC+%EC%A0%80%EC%9E%A5%EC%9D%8C%EC%8B%9D",
      _id: "5dac24566f816d03e1c00a13"
    }],
    isEnd: false,
    onAllBookDataLoad: jest.fn(),
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BookList {...props} />);
  });

  it('renders li items', () => {
    expect(wrapper.contains(<div className="status-off">대여가능</div>)).toBe(true);
    expect(wrapper.contains(<span className="title">열두 달 저장음식</span>)).toBe(true);
    expect(wrapper.contains(<span className="authors">김영빈</span>)).toBe(true);
    expect(wrapper.contains(<span className="publisher">원타임즈</span>)).toBe(true);
    expect(wrapper.contains(<span className="pubdate">2014-6-10 00:00:00</span>)).toBe(true);
    expect(wrapper.contains(<span className="owner">Yerin Kim</span>)).toBe(true);
    expect(wrapper.contains(<a href="https://search.daum.net/search?w=bookpage&bookId=1621016&q=%EC%97%B4%EB%91%90+%EB%8B%AC+%EC%A0%80%EC%9E%A5%EC%9D%8C%EC%8B%9D" target="_blank"><img src="https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1621016%3Ftimestamp%3D20190131080720" /></a>)).toBe(true);
  });

  it('renders handleWishBook on wish button click', async () => {
    const handleWishBook = jest.fn();
    handleWishBook.mockReturnValueOnce(new Promise((resolve, reject) => resolve()));

    wrapper.instance().handleWishBook = handleWishBook;

    const wishButton = wrapper.find('.wish-button');
    wishButton.simulate('click');

    await expect(wrapper.instance().handleWishBook).toHaveBeenCalled();
  });

  it('renders handleSearch on search button click', () => {
    const mock = jest.fn();
    wrapper.instance().handleSearch = mock;
    wrapper.instance().forceUpdate();

    const searchButton = wrapper.find('.search-button');
    searchButton.simulate('click');

    expect(mock).toHaveBeenCalled();
  });
 
  it('renders input text change', () => {
    const inputText = wrapper.find('input[type="text"]');

    const mockedEvent = {
      target: { value: 'foo' }
    };

    inputText.simulate('change', mockedEvent);

    expect(wrapper.state('value')).toEqual('foo');
  });
});
