import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from 'axios';

firebase.initializeApp({
  apiKey: 'AIzaSyAPqwh-MVyGCWh71G-jP6vwa6nHa0wELlY',
  authDomain: 'bookting-1acb0.firebaseapp.com'
});

class SignIn extends Component {
  state = {
    isSignedIn: false
  };

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async user => {
      this.setState({ isSignedIn: !!user });

      if (this.state.isSignedIn) {
        try {
          const response = await axios.post('/api/login', {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL
          });

          console.log(response);
        } catch (e) {
          console.log(e);
        }
      }
    });
  }

  render() {
    return (
      <div className='login'>
        <StyledFirebaseAuth
          className='login'
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    )
  }
}

export default SignIn;
