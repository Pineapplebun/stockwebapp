"use strict";
const https = require('https');
const express = require("express")
const morgan = require('morgan')
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const main = require('./main');
const fs = require('fs');

var app = express();
const PORT = process.env.PORT || 3002;

// use the public folder files as the client side files needed
app.use(express.static('build'));
app.use(bodyParser.urlencoded({ extended: false }));
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
    // Add something to the header field
    res.append('Set-Cookie', `lastPage= ${req.url}`);
    next();
}

app.use(myLogger);

// GET request for a stock symbol
app.get('/', function(req, res) {
    res.sendFile('./build/index.html');
})

// POST request for a given user and password
// TODO:

// POST request to add a stock to the watchlist
// Example: localhost:3000/watchlist/add?symbol=amd
app.get('/watchlist/add', function(req, res) {
    res.send(`added ${req.query.symbol} to watchlist`);
})

// GET request for the graph data
// console.log(req.params.symbol)
// main.getCollection(req, (data) => res.json(data))
// Example localhost:3000/amd?start=2017-12-01&end=2018-01-30
app.get('/:symbol', function(req, res) {
    let msg = {start: req.query.start, end: req.query.end, symbol: req.params.symbol};
    main.getIntervalCollection(msg, (data) => res.json(data));
})

// Start Listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
/*
const options = {
    cert: fs.readFileSync('./localhost.crt'),
    key: fs.readFileSync('./localhost.key')
};

const server = https.createServer(options, app);

server.listen(8001, function(){
    console.log("server running at https://localhost:8001/")
});*/

