const express = require('express'),
  router = express.Router(),
  searchController = require('./controllers/searchController');

/**
 * GET request for the graph data. The path is '/watchlist/amd?start=2017-12-01&end=2018-01-30'.
 */
router.get('/search', searchController.retrieveChartData)

module.exports = router;