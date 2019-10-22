import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { getJwt } from '../helpers';

class AuthComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined
    };
  }

  async componentDidMount() {
    const jwt = getJwt();
    if (jwt === 'Bearer null') {
      this.props.history.push('/login');
      this.setState({
        user: null
      });

      return;
    } else {
      try {
        const res = await axios.get('/api/auth/getUser', {
          headers: { 'authorization': getJwt() }
        });

        this.setState({
          user: res.data
        });
      } catch (err) {
        console.log('error');
        localStorage.removeItem('jwt');
        localStorage.removeItem('id');
        this.props.history.push('/login');
      }
    }
  }

  render() {
    const { user } = this.state;
    if (user === undefined) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    if (user === null) {
      this.props.history.push('/login');
    }

    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default withRouter(AuthComponent);
