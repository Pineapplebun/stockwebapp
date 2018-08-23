import React, { Component } from 'react';

import './App.css';
import SideFrame from './components/SideFrame.js';
import MainFrame from './components/MainFrame.js';
import NewsFrame from './components/NewsFrame.js';
import HeaderFrame from './components/HeaderFrame.js';
import FeaturesBar from './components/FeaturesBar.js';
import FooterBar from './components/FooterBar.js';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderFrame></HeaderFrame>
        <FeaturesBar></FeaturesBar>
        <div className="grid-container">
          <SideFrame className="sideframe"></SideFrame>
          <MainFrame className="mainframe"></MainFrame>
          <NewsFrame className="newsframe"></NewsFrame>
        </div>
        <FooterBar></FooterBar>
      </div>
    );
  }
}

export default App;