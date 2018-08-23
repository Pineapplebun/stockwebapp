import React, { Component } from 'react';
import '../App.css';
import './HeaderFrame.css';

export class HeaderFrame extends Component {
    render() {
        return (
            <header className="App-header">
                <h1 className="App-title">Stock Visualizer
                    <p className="App-intro">
                        You can add stocks to a watchlist and visualize stock data.
                    </p>
                </h1>
            </header>
        )
    }
}
export default HeaderFrame;