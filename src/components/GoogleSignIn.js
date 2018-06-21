import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

export class GoogleSignIn extends Component {

    render() {
        return (
            <div>
                <GoogleLogin
                    clientId="539270675308-uuv7fbph254uiobp2i64d3f24a6utkbe.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.onSuccess}
                    onFailure={this.onFailure}
                />
            </div>
        )
    }

    onSuccess(response) {
        console.log(response);
    }

    onFailure(error) {
        console.log(error);
    }

}

export default GoogleSignIn;