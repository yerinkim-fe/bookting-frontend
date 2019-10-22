import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

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
      <div className='Header'>
        <Link to={'/'}>Home</Link>
        <Link to={`/books/${this.user_id}`}>내서재</Link>
        <Link to={`/chat/${this.user_id}`}>Chat</Link>
        <Link to={`/wish/${this.user_id}`}>Wish</Link>
        <button onClick={() => this.handleSignOutClick()}>Sign out</button>
      </div>
    )
  }
}

export default withRouter(Header);
