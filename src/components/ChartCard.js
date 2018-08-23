import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './ChartCard.css';
import './Card.css';
import { Chart } from "react-google-charts";

export class ChartCard extends Component {
  render() {
    let options = {
      hAxis: {
        title: 'Date'
      },
      vAxis: {
        title: 'Volume'
      },
      colors: ['#a52714', '#097138']
    };
    console.log("data in", this.props.stockData);
    let data = handleLineChartFormat(this.props.stockData)
    data.unshift(["Date", "Volume"]);
    console.log(data);
    return (
      <div className="card">
        <Chart
          chartType="LineChart"
          data={data}
          width="100%"
          height="400px"
          legendToggle
          options={options}
        />
      </div>
    )
  }
}

/**
 * Create the proper array of data for Google LineChart.
 * @param {Array} chartData 
 */
const handleLineChartFormat = (chartData) => {
  if (chartData) {
    let formattedArray = chartData.map((obj) => {
      console.log(obj)
      // Retrieve the dates and their values
      let datetime = Object.keys(obj)[0];
      let datum = obj[datetime];
      return [datetime, parseInt(datum["5. volume"], 10)];
    })
    console.log(formattedArray);
    return formattedArray;
  } else {
    return [];
  }
}

/**
 * Specify required props for this component.
 */
ChartCard.propTypes = {
  stockData: PropTypes.array.isRequired,
  chartOptions: PropTypes.object.isRequired
}

/*
  This will map props.chartData to the reducer function chartReducer state
*/
const mapStateToProps = state => ({
  stockData: state.chart.stockData,
  chartOptions: state.chart.chartOptions
})


export default connect(mapStateToProps, {})(ChartCard);