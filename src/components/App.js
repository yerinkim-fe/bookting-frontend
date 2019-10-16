import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Header from './Header';
import BookList from './BookList';
import './App.scss';
import AuthComponent from './AuthComponent';

class App extends Component {
  render() {
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
            <Route path='/books' component={BookList} />
          </AuthComponent>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
