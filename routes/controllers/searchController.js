const stockUtils = require('../../utilities/stockUtils'),
  newsUtils = require('../../utilities/newsUtils');

/**
 * Returns the data required for the visualization.
 * @param {*} req 
 * @param {*} res 
 */
function retrieveChartData(req, res) {
  let msg = { symbol: req.query.symbol, start: req.query.start, start: req.query.end };
  let promises = [stockUtils.getStockData(msg), newsUtils.getNewsData(msg)];
  
  Promise.all(promises)
    .then((result) => {
      // Validate stockData and newsData
      let json = {
        stockData: stockUtils.filterStockData(result[0], req.query.start, req.query.end),
        newsData: result[1]["articles"]
      }
      // Todo: validate the results of the promises
      
      res
      .status(200)
      .cookie('last_resource_request', 'GET /watchlist', { maxAge: 600000 })
      .json(json);
    })
    .catch((err) => {
      res
      .status(400)
      .cookie('last_resource_request', 'GET /watchlist', { maxAge: 600000 })
      console.log(err);
    })
}

module.exports = {
  retrieveChartData,
}