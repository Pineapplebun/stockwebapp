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
          <div className="detailframe"> 
            <h3> News Headlines </h3> 
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;