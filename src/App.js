import React, { Component } from 'react';
import logo from './logo.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import SideFrame from './components/SideFrame.js';
import MainFrame from './components/MainFrame.js';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="grid-container">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Stock Chart Visualizer</h1>
            <p className="App-intro">
            Purpose: To visualize and play around with stock data.
            </p>
          </header>
          <SideFrame className="sideframe"></SideFrame>
          <MainFrame className="mainframe"></MainFrame>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;