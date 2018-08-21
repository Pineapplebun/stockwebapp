/**
 * Add a stock to a watchlist.
 * @param {*} req 
 * @param {*} res 
 */
function addStockToWatchlist(req, res) {
  // use method from database.js to update the string of stock symbols
  
  // respond with success or failure
  console.log('added');
}

/**
 * Remove a stock from a watchlist.
 * @param {*} req 
 * @param {*} res 
 */
function removeStockFromWatchlist(req, res) {
  console.log('removed');
}

/**
 * Modify stock properties.
 * @param {*} req 
 * @param {*} res 
 */
function modifyStockDetails(req, res) {
  console.log('modified');
}

module.exports = {
  addStockToWatchlist,
  removeStockFromWatchlist,
  modifyStockDetails
}