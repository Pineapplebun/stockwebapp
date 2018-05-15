"use strict";
const https = require('https');
const express = require("express")
const morgan = require('morgan')
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const fs = require('fs');

var app = express();
const PORT = process.env.PORT || 3000;

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

var index = require('./routes/index');
var watchlist = require('./routes/watchlist');
// var users = require('./routes/users')

//app.use('/', index);
app.use('/watchlist', watchlist);

// Start Listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

/*HTTPS for later...

const options = {
    cert: fs.readFileSync('./localhost.crt'),
    key: fs.readFileSync('./localhost.key')
};
const server = https.createServer(options, app);
server.listen(8001, function(){
    console.log("server running at https://localhost:8001/")
});*/

