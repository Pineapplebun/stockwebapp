const express = require('express'),
  router = express.Router(),
  watchlistController = require('./controllers/watchlistController');

/**
 * POST request to add a stock to the user's watchlist
 */
router.post('/:watchlist/:symbol', watchlistController.addStockToWatchlist)

/**
 * GET request for the graph data. The path is '/watchlist/amd?start=2017-12-01&end=2018-01-30'.
 */
router.get('/:watchlist/:symbol', watchlistController.retrieveChartData)

/**
 * DELETE request to remove a stock from the watchlist.
 */
router.delete('/:watchlist/:symbol', watchlistController.removeStockFromWatchlist)

/**
 * PUT request to modify a stock from the watchlist.
 */
router.put('/:watchlist/:symbol', watchlistController.modifyStockDetails)

module.exports = router;