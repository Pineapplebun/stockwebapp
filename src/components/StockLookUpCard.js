import React, { Component } from 'react';
import './Card.css';
import { List, ListItem } from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import { connect } from 'react-redux';
import { updateOptions, fetchChart, selectStock } from '../actions/chartActions';
import PropTypes from 'prop-types';

export class StockLookUpCard extends Component {
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
    return (
      <div className="card">
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
    );
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

  handleChartUpdate(e) {
    console.log('selectedStock', this.props.selectedStock);
    this.props.fetchChart({
      symbol: this.props.selectedStock,
      minDate: this.state.minDate.toISOString().split('T')[0],
      maxDate: this.state.maxDate.toISOString().split('T')[0],
    })
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

StockLookUpCard.propTypes = {
  fetchChart: PropTypes.func.isRequired,
  updateOptions: PropTypes.func.isRequired,
  selectStock: PropTypes.func.isRequired,
  selectedStock: PropTypes.string.isRequired,
  chartOptions: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  selectedStock: state.chart.selectStock,
  chartOptions: state.chart.chartOptions,
})

export default connect(mapStateToProps, {fetchChart, selectStock, updateOptions})(StockLookUpCard);