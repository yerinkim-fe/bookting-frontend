import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import logo from '../images/bookting-ci-s.png';
import my from '../images/icon-my.png';
import chat from '../images/icon-chat.png';
import wish from '../images/icon-wish.png';
import logout from '../images/icon-logout.png';

class Header extends Component {
  constructor(props) {
    super(props);

    this.user_id = localStorage.getItem('id');

    this.handleSignOutClick = this.handleSignOutClick.bind(this);
  }

  componentDidMount() {
    if (!firebase.apps.length) {
      const config = {
        apiKey: 'AIzaSyAPqwh-MVyGCWh71G-jP6vwa6nHa0wELlY',
        authDomain: 'bookting-1acb0.firebaseapp.com'
      };

      firebase.initializeApp(config);
    }
  }

  handleSignOutClick() {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem('jwt');
      localStorage.removeItem('id');
      this.props.history.push('/login');
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {


    return (
      <div className='header'>
        <h1><Link to={'/'}><img src={logo} /></Link></h1>

        <div className='nav'>
          <Link to={`/books/${this.user_id}`}><img src={my} /></Link>
          <Link to={`/chat/${this.user_id}`}><img src={chat} /></Link>
          <Link to={`/wish/${this.user_id}`}><img src={wish} /></Link>
          <button onClick={() => this.handleSignOutClick()}><img src={logout} /></button>
        </div>
      </div>
    )
  }
}

export default withRouter(Header);
