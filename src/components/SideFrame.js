import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {List, ListItem} from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
//import DatePicker from 'material-ui/DatePicker';
import './SideFrame.css';
export class SideFrame extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            startDate: '',
            endDate: '',
            text: '',
            rates: {},
            selStock: '',
            open: true
        }
        // Need to bind handlers to the enclosing object "this"
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleStartDateChange = this.handleStartDateChange.bind(this)
        this.handleEndDateChange = this.handleEndDateChange.bind(this)
        this.handleSelectStock = this.handleSelectStock.bind(this)
        this.handleChartUpdate = this.handleChartUpdate.bind(this)
        this.handleTextBox = this.handleTextBox.bind(this)
    }

    // calls the callback for the parent of SideWidget
    handleChartUpdate(e) {
        console.log(this);
        this.props.onChartUpdate({
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            symbol: this.state.selStock
        })
    }

    // callback for the select stock in StockList
    handleSelectStock(e) {
        const s = e;
        this.setState({selStock: s});
        console.log(this);
    }

    // render the sidebar html
    render() {
        //const selStock = this.state.selStock
        //const chartInfo = this.props.chartInfo;
        return (
            <div>
                <h3> Options
                    <div>Start Date
                        <DatePicker 
                        currentDate={this.state.startDate}
                        dateChange={this.handleStartDateChange}
                        />
                    </div>
                    <div>End Date
                        <DatePicker 
                        currentDate={this.state.endDate}
                        dateChange={this.handleEndDateChange}
                        />
                    </div>
                </h3>
                <button onClick={this.handleChartUpdate}>
                    Press me to show the Visual
                </button>
                <Drawer open={this.state.open}>
                    <StockList
                        onSelectStock={this.handleSelectStock}
                        items={this.state.items}
                        rates={this.state.rates}
                    />
                    <form onSubmit={this.handleSubmit}>
                        <input
                            onChange={this.handleTextBox}
                            value={this.state.text}
                        />
                        <button>Add to Watchlist</button>
                    </form>
                </Drawer>
            </div>
        )
    }

    handleTextBox(e) {
        this.setState({text: e.target.value})
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
            text:''
        }))
    }

    handleStartDateChange(e) {
        this.setState(
            {startDate: e.target.value}
        )
    }
    handleEndDateChange(e) {
        this.setState(
            {endDate: e.target.value}
        )
    }
}

class DatePicker extends React.Component {
    render() {
        return (
            <input
                value={this.props.currentDate}
                onChange={this.props.dateChange}
            />
        )
    }
}

// Make sure you can explain how the map works.
class StockList extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(e) {
        // console.log(e.target.value);
        this.props.onSelectStock(e.target.value);
    }
    render() {
      return (
        <List>
          {this.props.items.map(item => (
            <MenuItem onClick={this.handleClick} primaryText={item.text} key={item.id} text={item.text} price={this.props.rates[item.text]} />
          ))}
        </List>
      );
    }
}
