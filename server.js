"use strict";

const express = require("express")
const morgan = require('morgan')
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const main = require('./main')

var app = express();
const PORT = process.env.PORT || 3000;

// use the public folder files as the client side files needed
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Overrides the HTTP method used.  Primarily for backwards compatibility
// but helps to ensure the server is presenting a RESTful API even when not
// fully supported by front end actions
app.use(methodOverride('_method'));
app.use(cookieParser('my very well kept secret'));

// Adding in our own middleware logger
function myLogger(req, res, next) {
    console.log('Raw Cookies: ', req.headers.cookie);
    console.log('Cookie Parser: ', req.cookies);
    console.log('Signed Cookies: ', req.signedCookies);
    if (req.body) {
        console.log('LOG:', req.method, req.url, req.body);
    }
    res.append('Set-Cookie', `lastPage= ${req.url}`);
    next();
}

// Define routes here
// POST request for a given user and password

// POST request to add a stock to the watchlist
app.get('/watchlist/add', function(req, res) {
    //localhost:3000/watchlist/add?symbol=amd
    res.send(`added ${req.query.symbol} to watchlist`)
})

// GET request for a stock symbol
app.get('/', function(req, res) {
    res.sendFile('./public/index.html')
})

// GET request for the graph data
app.get('/:symbol', function(req, res) {
    //console.log(req.params.symbol)
    //main.getCollection(req, (data) => res.json(data))
    //localhost:3000/amd?start=2017-12-01&end=2018-01-30
    let msg = {start: req.query.start, end: req.query.end, symbol: req.params.symbol}
    main.getIntervalCollection(msg, (data) => res.json(data))
})

// Start Listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});