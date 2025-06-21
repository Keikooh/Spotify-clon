import React, { Component } from 'react'
import { handleClick } from './Login';

export class LoginComponent extends Component {
  render() {
    return (
      <button onClick={ handleClick }>Login</button>
    )
  }
}

export default LoginComponent