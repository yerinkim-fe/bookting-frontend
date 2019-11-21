import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import axiosInstance from '../../api';
import './Login.scss';
import logo from '../../images/bookting-ci.png';
import facebook from '../../images/btn-login-facebook.png';

class Login extends Component {
  constructor(props) {
    super(props);

    this.facebookLogin = this.facebookLogin.bind(this);
    this.facebookLogOut = this.facebookLogOut.bind(this);
  }
  componentDidMount() {
    if (!firebase.apps.length) {
      const config = {
        apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
      };

      firebase.initializeApp(config);
    }
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    const { history } = this.props;

    firebase.auth().signInWithPopup(provider).then(async result => {
      if (result) {
        const { uid, displayName, email, photoURL } = result.user;
        const jwtTokenResponse = await axiosInstance.post('/api/auth/getToken', {
          uid,
          name: displayName,
          email,
          photo_url: photoURL
        });

        if (jwtTokenResponse.data) {
          const { token, id } = jwtTokenResponse.data;
          localStorage.setItem('jwt', token);
          localStorage.setItem('id', id);
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
      localStorage.removeItem('id');
    }).catch((error) => {
      console.log(error);
    });
  }


  render() {
    return (
      <div className="login">
        <img src={logo} />

        <p>읽고 싶은 책, <br/>사지 말고 함께 봐요</p>

        <div className="login-button">
          <button
            className="facebook"
            type="submit"
            onClick={this.facebookLogin}
          >
            <img src={facebook} />
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
