import React, { Component } from 'react';
import googleButton from './google_signin_buttons/web/1x/btn_google_signin_light_normal_web.png'

export class GoogleSignIn extends Component {

  render() {
    return (
      <div>
        <a href="/auth/google">Sign In with Google>
          <img src={googleButton} alt="Sign in with Google Button"></img>
        </a>
      </div>
    )
  }

}

export default GoogleSignIn;