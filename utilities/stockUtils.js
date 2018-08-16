const axios = require("axios"),
  timeSeries = 'TIME_SERIES_DAILY',
  apiKeyAV = process.env.STOCK_API;

module.exports = {
  getStockData,
  filterStockData
}

function getStockData(msg) {
  return axios.get(`https://www.alphavantage.co/query?function=${timeSeries}&symbol=${msg.symbol}&apikey=${apiKeyAV}`)
}

/**
 * Function to filter data.
 */
function filterStockData(data, start, end) {
  let startDate = new Date(start);
  let endDate = new Date(end);

  // Organize the data into the correct format
  let stockDataArray = _formatStockData(data);
  let _filter = (sData) => {
    let stockDate = Object.keys(sData)[0];
    stockDate = new Date(stockDate);
    return startDate <= stockDate && stockDate <= endDate;
  }
  return stockDataArray.filter(_filter);
}

/**
 * Helper function to format stock data.
 * @param {*} data 
 */
function _formatStockData(data) {
  let json = JSON.parse(data);
  let daily = json["Time Series (Daily)"];
  let arr = [];
  for (let date in daily) {
    let newObj = {};
    newObj[date] = daily[date];
    arr.push(newObj);
  }
  return arr;
}

