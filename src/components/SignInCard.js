import React, { Component } from 'react';
import './Card.css';
import GoogleSignIn from './GoogleSignIn';

export class SignInCard extends Component {
  render() {
    return (
      <div className="card">
        <h1>Sign In Providers</h1>
        <GoogleSignIn></GoogleSignIn>
      </div>
    )
  } 
}

export default SignInCard;