import React, { Component } from 'react';
import './MainFrame.css';
import ChartCard from './ChartCard';

export class MainFrame extends Component {
  // The Main Frame has more than just the chart
  render() {
    return (
      <ChartCard/>
    )
  }
}

export default MainFrame;