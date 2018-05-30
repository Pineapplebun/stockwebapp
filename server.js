const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;
// routes
const index = require('./routes/index');
const watchlist = require('./routes/watchlist');
// const users = require('./routes/users');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(myLogger);
app.use(morgan('common'));
app.use('/', index);
app.use('/watchlist', watchlist);

// use the build folder files as the client side files needed
app.use(express.static('build'));

// Start Listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

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