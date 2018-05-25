import React, { Component } from 'react';
import logo from './logo.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import SideFrame from './components/SideFrame.js';
import MainFrame from './components/MainFrame.js';
import NewsFrame from './components/NewsFrame.js';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Stock Chart Visualizer
              <p className="App-intro">
                You can add stocks to a watchlist and visualize stock data.
              </p>
            </h1>
        </header>
        <div className="grid-container">
          <SideFrame className="sideframe"></SideFrame>
          <MainFrame className="mainframe"></MainFrame>
          <NewsFrame className="newsframe"></NewsFrame>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;