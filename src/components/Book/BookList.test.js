import React from 'react';
import { shallow, mount } from 'enzyme';
import BookList from './BookList';

describe('<BookList />', () => {
  const books = [{
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
  }];

  const onAllBookDataLoad = jest.fn();

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BookList books={books} onAllBookDataLoad={onAllBookDataLoad} />);
  });

  it('renders handleSearch on search button click', () => {
    wrapper.instance().handleSearch = jest.fn();
    wrapper.instance().forceUpdate();

    const searchButton = wrapper.find('.search-button');
    searchButton.simulate('click');

    expect(wrapper.instance().handleSearch).toHaveBeenCalled();
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
