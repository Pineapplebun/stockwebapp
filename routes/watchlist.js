const express = require('express');
const router = express.Router();
const stockUtils = require('../utilities/stockUtils');
const newsUtils = require('../utilities/newsUtils');

// POST request to add a stock to the user's watchlist
// Example: localhost:3000/watchlist/add?symbol=amd
router.get('/add/:symbol', function (req, res) {
  // Check if token for the session and the user match up

  // use method from database.js to update the string of stock symbols"
  
  // respond with success or failure
  res.send(`added ${req.query.symbol} to watchlist`);
})

// GET request for the graph data
// Example localhost:3000/watchlist/amd?start=2017-12-01&end=2018-01-30
router.get('/:symbol', function (req, res) {
  let msg = { start: req.query.start, end: req.query.end, symbol: req.params.symbol };
  let promises = [];

  promises.push(stockUtils.getIntervalCollection(msg));
  promises.push(newsUtils.getNews(msg));

  Promise.all(promises)
    .then((result) => {
      let json = {};
      json["stockData"] = result[0];
      json["newsData"] = result[1];
      res.json(json);
    }, (err) => {
      console.log(err);
      res.json(err);
    })
})

module.exports = router;