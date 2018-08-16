const stockUtils = require('../../utilities/stockUtils'),
  newsUtils = require('../../utilities/newsUtils');

/**
 * Returns the data required for the visualization.
 * @param {*} req 
 * @param {*} res 
 */
function retrieveChartData(req, res) {
    let msg = { symbol: req.params.symbol, start: req.query.start, start: req.query.end };
    let promises = [stockUtils.getStockData(msg), newsUtils.getNewsData(msg)];
    
    Promise.all(promises)
      .then((result) => {
        let json = {
          stockData: stockUtils.filterStockData(result[0], req.query.start, req.query.end),
          newsData: result[1]["articles"]
        }
        res
        .status(200)
        .cookie('last_resource_request', 'GET /watchlist', { maxAge: 600000, httpOnly: true })
        .json(json);
      })
      .catch((err) => {
        res
        .status(400)
        .cookie('last_resource_request', 'GET /watchlist', { maxAge: 600000, httpOnly: true })
        console.log(err);
      })
}

/**
 * Add a stock to a watchlist.
 * @param {*} req 
 * @param {*} res 
 */
function addStockToWatchlist(req, res) {
  // Check if token for the session and the user match up in the redis session store

  // use method from database.js to update the string of stock symbols"
  
  // respond with success or failure
  
}

/**
 * Remove a stock from a watchlist.
 * @param {*} req 
 * @param {*} res 
 */
function removeStockFromWatchlist(req, res) {

}

/**
 * Modify stock properties.
 * @param {*} req 
 * @param {*} res 
 */
function modifyStockDetails(req, res) {

}

module.export = {
    retrieveChartData,
    addStockToWatchlist,
    removeStockFromWatchlist,
    modifyStockDetails
}