import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

export class MainFrame extends Component {
    // The Main Frame has more than just the chart
    render() {
        const data = this.props.chartData;
        const XAxisKey = this.props.XAxisKey;
        const YAxisKey = this.props.YAxisKey;
        return (
            <LineChart width={1000} height={1000} data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis datakey={XAxisKey}/>
                <YAxis />
                <Line type="monotone" dataKey={YAxisKey} stroke="#8884d8" />
            </LineChart>
        )
    }
}