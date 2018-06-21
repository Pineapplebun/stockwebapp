import React, { Component } from 'react';
import GoogleSignIn from './GoogleSignIn';
import logo from '../logo.svg';
import '../App.css';

export class HeaderFrame extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Stock Chart Visualizer
                <p className="App-intro">
                    You can add stocks to a watchlist and visualize stock data.
                </p>
                </h1>
                <GoogleSignIn></GoogleSignIn>
            </header>
        )
    }
}

export default HeaderFrame;