import React, { Component } from 'react';
import logo from './logo.svg';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import {SideFrame} from './components/SideFrame.js';
import {MainFrame} from './components/MainFrame.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        chartInfo: {},
        chartData: [],
        newsData: []
    };
    this.handleGraphicsUpdate = this.handleGraphicsUpdate.bind(this);
    this.handleChartSort = this.handleChartSort.bind(this);
  }

  // e = {startDate: , endDate: , selStock: }
  handleGraphicsUpdate(e) {
      this.setState({chartInfo: e})
      // Fetch from our server the stock data
      // Save this data in this.state.chartInfo
      console.log(e);
      fetch(`http://localhost:3000/watchlist/${e.symbol}?start=${e.startDate}&end=${e.endDate}`)
      .then(response => { 
          if (response.ok) {
              return response.json();
          } else {
              throw response.error;
          }
      })
      .then(json => {
          console.log(json);
          this.setState({chartData: this.handleChartSort(json.stockData)});
          this.setState({newsData: json.newsData});
      })
      .catch(error => console.log(error))
  }

  handleChartSort(chartData) {
    if (chartData) {
      let sorted = [];
      for (let obj of chartData) {
        let key = Object.keys(obj)[0];
        let datum = obj[key];
        datum["time"] = key;
        datum["volume"] = parseInt(datum["5. volume"], 10);
        sorted.push(datum);
      }
      console.log(sorted);
      return sorted;
    } else {
      return [];
    }
  }

  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <SideFrame onChartUpdate={this.handleGraphicsUpdate}></SideFrame>
          <MainFrame XAxisKey="time" YAxisKey="volume" chartData={this.state.chartData}></MainFrame>
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;