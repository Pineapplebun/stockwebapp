import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import SideFrame from './components/SideFrame.js';
import MainFrame from './components/MainFrame.js';
import NewsFrame from './components/NewsFrame.js';
import HeaderFrame from './components/HeaderFrame.js';
import FeaturesBar from './components/FeaturesBar.js';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <HeaderFrame></HeaderFrame>
        <FeaturesBar></FeaturesBar>
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