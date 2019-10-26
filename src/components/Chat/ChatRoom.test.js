import React from 'react';
import { shallow, mount } from 'enzyme';
import ChatRoom from './ChatRoom';

describe('<ChatRoom />', () => {
  const props = {
    messages: [{
      author: {
        name: "Yerin Kim",
        photo_url: "https://lh6.googleusercontent.com/-sQYgUyFWyEI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reRWoHsH_UcwkGdF4OSbMrJL7Ni_Q/photo.jpg",
        _id: "5dac1a88a00d74b6134a29b4"
      },
      created_at: "2019-10-23T07:52:46.001Z",
      message: "test",
      updated_at: "2019-10-23T07:52:46.001Z",
      _id: "5db006cd457bea68cc8e527f"
    }],
    user: {
      name: "Trueb",
      photo_url: "https://graph.facebook.com/107680110656781/picture",
      _id: "5dadaeefc8b6f81eda4c9a96"
    },
    onChatDataLoad: jest.fn(),
    match: {
      params: {
        chat_id: "5dafdf48158d6a624f3c919f"
      }
    }
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ChatRoom {...props} />);
  });

  it('renders li items', () => {
    expect(wrapper.contains(<p className="username">Yerin Kim</p>)).toBe(true);
    expect(wrapper.contains(<p className="text">test</p>)).toBe(true);
    expect(wrapper.contains(<span className="time">19년 10월 23일</span>)).toBe(true);  
  });

  it('renders handleSend on search button click', () => {
    const mock = jest.fn();
    wrapper.instance().handleSend = mock;
    wrapper.instance().forceUpdate();

    const searchButton = wrapper.find('.send-button');
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
