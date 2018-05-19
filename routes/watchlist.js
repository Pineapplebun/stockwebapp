var express = require('express');
var router = express.Router();
const stockUtils = require('../utilities/stockUtils');
const newsUtils = require('../utilities/newsUtils');

// POST request to add a stock to the watchlist
// Example: localhost:3000/watchlist/add?symbol=amd
router.get('/add', function(req, res) {
    res.send(`added ${req.query.symbol} to watchlist`);
})

// GET request for the graph data
// console.log(req.params.symbol)
// main.getCollection(req, (data) => res.json(data))
// Example localhost:3000/watchlist/amd?start=2017-12-01&end=2018-01-30
router.get('/:symbol', function(req, res) {
    let msg = {start: req.query.start, end: req.query.end, symbol: req.params.symbol};
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
        res.send(err);
    })
})

module.exports = router;