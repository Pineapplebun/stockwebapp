import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import './SideFrame.css';
import './Card.css';
import { connect } from 'react-redux';
import { updateOptions, fetchChart, selectStock } from '../actions/chartActions';
import PropTypes from 'prop-types';
import GoogleSignIn from './GoogleSignIn';

export class SideFrame extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      minDate: new Date(),
      maxDate: new Date(),
      text: '',
      rates: {},
      open: true,
      autoOk: false,
      disableYearSelection: false,
    }
    // Need to bind handlers to the enclosing object "this"
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeMinDate = this.handleChangeMinDate.bind(this);
    this.handleChangeMaxDate = this.handleChangeMaxDate.bind(this);
    this.handleSelectStock = this.handleSelectStock.bind(this);
    this.handleChartUpdate = this.handleChartUpdate.bind(this);
    this.handleTextBox = this.handleTextBox.bind(this);
  }

  render() {
    //console.log(Object.keys(this.props).length === 0);
    return (
      //<Drawer open={this.state.open}>
      <div className="card">
        <GoogleSignIn></GoogleSignIn>
        <h3> Enter a stock symbol: </h3>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleTextBox}
            value={this.state.text}
          />
          <button>Add to Watchlist</button>
        </form>
        <h3> Chart Options</h3>
        <div className="container">
          <DatePicker
            onChange={this.handleChangeMinDate}
            autoOk={this.state.autoOk}
            floatingLabelText="Min Date"
            defaultDate={this.state.minDate}
            disableYearSelection={this.state.disableYearSelection}
          />
          <DatePicker
            onChange={this.handleChangeMaxDate}
            autoOk={this.state.autoOk}
            floatingLabelText="Max Date"
            defaultDate={this.state.maxDate}
            disableYearSelection={this.state.disableYearSelection}
          />
        </div>
        <button onClick={this.handleChartUpdate}>
          Update Chart
        </button>
        <h3> Watchlist </h3>
        <StockList
          onSelectStock={this.handleSelectStock}
          items={this.state.items}
          rates={this.state.rates}
        />
      </div>
      //</Drawer>

    );
  }

  // calls the action for fetching the stock data
  // the data will be stored in the redux store
  handleChartUpdate(e) {
    console.log('selectedStock', this.props.selectedStock);
    this.props.fetchChart({
      symbol: this.props.selectedStock,
      minDate: this.state.minDate.toISOString().split('T')[0],
      maxDate: this.state.maxDate.toISOString().split('T')[0],
    })
  }

  handleTextBox(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now(),
      rate: this.state.rates[this.state.text]
    }
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }))
  }
  handleChangeMinDate(e, date) {
    this.setState(
      { minDate: date }
    )
  }
  handleChangeMaxDate(e, date) {
    this.setState(
      { maxDate: date }
    )
  }

  // callback for the select stock in StockList
  handleSelectStock(e) {
    // add the value to our redux store
    this.props.selectStock(e.target.textContent);
  }
}

// Make sure you can explain how the map works.
class StockList extends React.Component {
  render() {
    return (
      <List>
        {this.props.items.map(item => (
          <MenuItem onClick={this.props.onSelectStock} primaryText={item.text} key={item.id} text={item.text} price={this.props.rates[item.text]} />
        ))}
      </List>
    );
  }
}

SideFrame.propTypes = {
  fetchChart: PropTypes.func.isRequired,
  updateOptions: PropTypes.func.isRequired,
  selectStock: PropTypes.func.isRequired,
  selectedStock: PropTypes.string.isRequired,
  chartOptions: PropTypes.object.isRequired,
}

/*
This will map props.chartData to the reducer function chartReducer state
*/
const mapStateToProps = state => ({
  // define the props for the SideFrame component
  selectedStock: state.chart.selectStock,
  chartOptions: state.chart.chartOptions,
})
/*
const mapDispatchToProps = dispatch => ({
  fetchChart: msg => dispatch(fetchChart(msg)),
  selectStock: stock => dispatch(selectStock(stock)),
  updateOptions: options => dispatch(updateOptions(options)),
})*/

export default connect(mapStateToProps, {fetchChart, selectStock, updateOptions})(SideFrame);