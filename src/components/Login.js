import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.facebookLogin = this.facebookLogin.bind(this);
    this.facebookLogOut = this.facebookLogOut.bind(this);
  }
  componentDidMount() {
    if (!firebase.apps.length) {
      const config = {
        apiKey: process.env.FIREBASE_APIKEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN
      };

      firebase.initializeApp(config);
    }
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    const { history } = this.props;

    firebase.auth().signInWithPopup(provider).then(async (result) => {
      if (result) {
        const jwtTokenResponse = await axios.post('/auth/getToken', {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL
        });

        if (jwtTokenResponse.data) {
          const token = jwtTokenResponse.data;
          localStorage.setItem('jwt', token);
          history.push('/');
        }
      }
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      window.alert(`error code: ${errorCode}, error message: ${errorMessage}`);
    });
  }

  facebookLogOut() {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem('jwt');
    }).catch((error) => {
      console.log(error);
    });
  }


  render() {
    return (
      <div className="loginPage">
        <div className="loginBtn">
          <button
            className="facebook"
            type="submit"
            onClick={this.facebookLogin}
          >
            facebook login
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
