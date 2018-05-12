var Chart = require('react-d3-core').Chart;
var LineChart = require('react-d3-basic').LineChart;

import SideWidget from './app/sidebar.jsx';
// Create component classes to display features on a page
class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            chartInfo: {},
            chartData: []
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
        // Fetch from our server the stock data
        // Save this data in this.state.chartInfo
        fetch(`localhost:3000/visualize?
        stock=${this.state.chartInfo.symbol}&
        startdate=${this.state.chartInfo.startDate}&
        enddate=${this.state.chartInfo.endDate}`)
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
            this.setState({chartData: json})

        })
        .catch(error => console.log(error))
    }
}

ReactDOM.render(<MainApp />, document.getElementById('root'));