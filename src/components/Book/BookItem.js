import React from 'react';
import { getDateFormat } from '../../utils';
import './Book.scss';

const BookItem = props => {
  const { books, type, handleWishBook, handleUpdateBook, handleRemoveBook, handleAddBook, handleRemoveWish, wishItem, wishIndex } = props;

  const bookList = books.map((item, index) => {
    const authors = item.authors.join(', ');

    return (
      <li key={index}>
        <a href={item.url} target='_blank'><img src={item.thumbnail} /></a>
        <div className='info'>
          {
            type === 'all' &&
            <>
              {
                item.status ?
                <div className='status-on'>대여중</div> :
                <div className='status-off'>대여가능</div>
              }
            </>
          }
          <span className='title'>{item.title}</span>
          <span className='authors'>
            {authors}
          </span>
          <span className='publisher'>
            {item.publisher}
          </span>
          <span className='pubdate'>
            {getDateFormat(item.pubdate)}
          </span>

          {
            type === 'all' &&
            <span className='owner'>
              {item.owner.name}
            </span>
          }
        </div>

        {
          (type === 'all' && (localStorage.getItem('id') !== item.owner._id) && !item.status) &&
          <div className='buttons'>
            <button type='button' className='wish-button' onClick={() => handleWishBook(index)}>담기</button>
          </div>
        }

        {
          type === 'my' &&
          <div className='buttons'>
            {
              item.status ?
              <button type='button' className='toggle-button-on' onClick={() => handleUpdateBook(index)}>대여중</button>
              :
              <button type='button' className='toggle-button-off' onClick={() => handleUpdateBook(index)}>대여가능</button>
            }

            <button type='button' onClick={() => handleRemoveBook(index)}>삭제</button>
          </div>
        }

        {
          type === 'new' &&
          <div className='buttons'>
            <button type='button' onClick={() => handleAddBook(index)}>등록</button>
          </div>
        }

        {
          type === 'wish' &&
          <div className='buttons'>
            <button type='button' onClick={() => handleRemoveWish(wishItem.wishId, wishIndex, index)}>삭제</button>
          </div>
        }
      </li>
    );
  });

  return (
    <>
      {bookList}
    </>
  );
};

export default BookItem;
