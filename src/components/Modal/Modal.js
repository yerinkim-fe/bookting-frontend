import React, { Component } from 'react';
import './Modal.scss';

export default class Modal extends Component {
  render() {
    return (
      <div className='modal'>
        {this.props.children}
      </div>
    );
  }
}
