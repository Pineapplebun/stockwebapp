import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {SideWidget} from './SideWidget.js';
import {MainFrame} from './MainFrame.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        items: [],
        chartInfo: {},
        chartData: []
    };
    this.handleGraphicsUpdate = this.handleGraphicsUpdate.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  // e = {startDate: , endDate: , selStock: }
  handleGraphicsUpdate(e) {
      this.setState({chartInfo: e})
      // Fetch from our server the stock data
      // Save this data in this.state.chartInfo
      console.log(e);
      fetch(`http://localhost:3002/${e.symbol}?start=${e.startDate}&end=${e.endDate}`)
      .then(response => { 
          if (response.ok) {
              return response.json();
          } else {
              throw "No Data";
          }
      })
      .then(json => {
          let newItems = []
          for (let item in json.rates) {
              newItems.push(item + " -> " + json.rates[item]);
          }
          this.setState({items: newItems});
          this.setState({chartData: this.handleSort(json)});

      })
      .catch(error => console.log(error))
  }

  handleSort(chartData) {
    if (chartData) {
      let sorted = [];
      for (let obj of chartData) {
        let key = Object.keys(obj)[0];
        let datum = obj[key];
        datum["time"] = key;
        datum["volume"] = parseInt(datum["5. volume"]);
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <SideWidget onChartUpdate={this.handleGraphicsUpdate}></SideWidget>
          <MainFrame XAxisKey="time" YAxisKey="volume" chartData={this.state.chartData}></MainFrame>
        </div>
      </div>
      
    );
  }
}

export default App;