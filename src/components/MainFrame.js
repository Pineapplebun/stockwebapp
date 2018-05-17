import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class MainFrame extends Component {
  // The Main Frame has more than just the chart
  render() {
    const data = handleChartSort(this.props.chartData);
    //var XAxisKey = this.props.chartOptions.XAxisKey;
    //var YAxisKey = this.props.chartOptions.YAxisKey;
    var XAxisKey="time";
    var YAxisKey="volume";
    return (
      <LineChart width={1000} height={1000} data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis datakey={XAxisKey} />
        <YAxis />
        <Line type="monotone" dataKey={YAxisKey} stroke="#8884d8" />
      </LineChart>
    )
  }
}

MainFrame.propTypes = {
  chartData: PropTypes.array.isRequired,
  newsData: PropTypes.array.isRequired,
  chartOptions: PropTypes.object.isRequired,
}

/*
This will map props.chartData to the reducer function chartReducer state
*/
const mapStateToProps = state => ({
  chartData: state.chart.chartData,
  newsData: state.chart.newsData,
  chartOptions: state.chart.chartOptions,
})

const handleChartSort = (chartData) => {
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

export default connect(mapStateToProps, {})(MainFrame);