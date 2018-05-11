// Create component classes to display features on a page
class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            chartInfo: {}
        };
        this.handleGraphicsUpdate = this.handleGraphicsUpdate.bind(this);
    }

    render() {
        return (
            <div>
                <SideWidget onChartUpdate={this.handleGraphicsUpdate}></SideWidget>
                
            </div>
        );
    }

    // e = {startDate: , endDate: , selStock: }
    handleGraphicsUpdate(e) {
        this.setState({chartInfo: e})
        fetch("http://api.fixer.io/2017-11-02")
        .then(response => { 
        if (response.ok) {
            return response.json()
        } else {
            throw "No Data"
        }
        })
        .then(json => {
        let newItems = []
        for (let item in json.rates) {
            newItems.push(item + " -> " +json.rates[item])
        }
        this.setState({items: newItems})
        })
        .catch(error => console.log(error))
    }
}


class SideWidget extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            startDate: '',
            endDate: '',
            text: '',
            rates: {},
            selStock: ''
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
        this.props.onChartUpdate({
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            selStock: this.state.selStock
        })
    }

    // callback for the select stock in StockList
    handleSelectStock(e) {
        this.setState({selStock: e})
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
        this.props.onSelectStock(e.target.text)
    }
    render() {
      return (
        <ul>
          {this.props.items.map(item => (
            <Item onClick={this.handleClick} key={item.id} text={item.text} price={this.props.rates[item.text]} />
          ))}
        </ul>
      );
    }
}
  
  // Can you list Item's props?
  
function Item(props) {
    return (
        <li>{props.text} -> {props.price}</li>
    )
}
ReactDOM.render(<MainApp />, document.getElementById('root'));