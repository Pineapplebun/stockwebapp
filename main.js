const https = require("https")
const fs = require("fs")

// Stock API for daily series
/* Example format for daily series
{
    "Meta Data": {
        "1. Information": "Daily Prices (open, high, low, close) and Volumes",
        "2. Symbol": "MSFT",
        "3. Last Refreshed": "2018-05-08",
        "4. Output Size": "Compact",
        "5. Time Zone": "US/Eastern"
    },
    "Time Series (Daily)": {
        "2018-05-08": {
            "1. open": "95.8456",
            "2. high": "96.1600",
            "3. low": "95.0631",
            "4. close": "95.8100",
            "5. volume": "22763628"
        },
        "2018-05-07": {
            "1. open": "95.1700",
            "2. high": "96.7100",
            "3. low": "95.1000",
            "4. close": "96.2200",
            "5. volume": "24242019"
        },
*/

module.exports = {
    getCollection: getCollection,
    getIntervalCollection: getIntervalCollection
}
var symbol = ''
var timeSeries = 'TIME_SERIES_DAILY'
var apiKeyAV = fs.readFileSync("./api.txt")
var urlAV = `https://www.alphavantage.co/query?function=${timeSeries}&symbol=${symbol}&apikey=${apiKeyAV}`

function getCollection(req, callback) {
    urlAV = `https://www.alphavantage.co/query?function=${timeSeries}&symbol=${req.symbol}&apikey=${apiKeyAV}`
    https.get(urlAV, (res) => {
        // data is requested is buffered
        let data = ''
        res.on('data', (chunk) => {data += chunk});
        res.on('end', () => {callback(array(data))})
        
    })
    .on('error', (e) => {print(Error(e));})
}

function getIntervalCollection(req, callback) {
    let startDate;
    let endDate;
    try {
        startDate = new Date(req.start);
        endDate = new Date(req.end);
    } catch (e) {
        throw Error(e)
    }
    getCollection(req, (data) => {
        let arrSeries = data;
        let interval = [];
        for (let timepoint of arrSeries) {
            let date = Object.keys(timepoint)[0];
            let stockDate = new Date(date);
            if (startDate <= stockDate && stockDate <= endDate) {
                interval.push(timepoint);
            }
        }
        callback(interval);
    });
    
}

function print(data) {
    console.log(data);
}

function array(data) {
    try {
        let json = JSON.parse(data);
        let daily = json["Time Series (Daily)"];
        let arr = [];
        for (let date in daily) {
            let newObj = {}
            newObj[date] = daily[date]
            arr.push(newObj);
        }
        return arr;
    } catch(e) {
        throw Error(e);
    }
}

//getCollection(print);
//getIntervalCollection('2017-12-01', '2018-01-30', print);

