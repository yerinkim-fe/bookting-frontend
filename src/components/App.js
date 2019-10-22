import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Header from './Header';
import BookList from './Book/BookList';
import MyBookList from './Book/MyBookList';
import MyBookNew from './Book/MyBookNew';
import WishList from './Book/WishList';
import './App.scss';
import AuthComponent from './AuthComponent';

class App extends Component {
  render() {
    const {
      onMyBookDataLoad,
      onWishBookDataLoad,
      bookData,
      bookIsEnd
    } = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' exact render={() => {
              return <Redirect to='/books' />;
            }}
          />
          <AuthComponent>
            <Header />
            <Route
              exact path='/books'
              render={routeProps => {
                return <BookList
                  {...routeProps}
                  onBookDataLoad={this.props.onBookDataLoad}
                  books={bookData}
                  isEnd={bookIsEnd}
                />
              }}
            />
            <Route
              exact path='/books/new/:user_id'
              render={routeProps => {
                return <MyBookNew
                  {...routeProps}
                />
              }}
            />
            <Route
              exact path='/books/:user_id'
              render={routeProps => {
                return <MyBookList
                  {...routeProps}
                  onMyBookDataLoad={onMyBookDataLoad}
                  onUpdateBook={this.props.onUpdateBook}
                  onRemoveBook={this.props.onRemoveBook}
                  books={bookData}
                  isEnd={bookIsEnd}
                />
              }}
            />
            <Route
              exact path='/wish/:user_id'
              render={routeProps => {
                return <WishList
                  {...routeProps}
                  onWishBookDataLoad={onWishBookDataLoad}
                  books={bookData}
                  isEnd={bookIsEnd}
                />
              }}
            />
            {/* <Route path='/my' component={BookRegister} /> */}

          </AuthComponent>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
