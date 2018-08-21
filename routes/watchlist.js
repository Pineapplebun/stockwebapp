const express = require('express'),
  router = express.Router(),
  watchlistController = require('./controllers/watchlistController');

/**
 * POST request to add a stock to the user's watchlist
 */
router.post('/watchlist/:watchlist', watchlistController.addStockToWatchlist)

/**
 * GET request for the graph data. The path is '/watchlist/amd?start=2017-12-01&end=2018-01-30'.
 */
router.get('/watchlist/:watchlist', watchlistController.getStockFromWatchlist)

/**
 * DELETE request to remove a stock from the watchlist.
 */
router.delete('/watchlist/:watchlist', watchlistController.removeStockFromWatchlist)

/**
 * PUT request to modify a stock from the watchlist.
 */
router.put('/watchlist/:watchlist', watchlistController.modifyStockDetails)

module.exports = router;