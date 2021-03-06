const express = require("express"),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  cookieParser = require('cookie-parser'),
  //redis = require('redis'),
  mongoose = require('mongoose'),
  MongoStore = require('connect-mongo')(session);
  //RedisStore = require('connect-redis')(session),
  passport = require('passport');

// Import routes
const index = require('./routes/index'),
  watchlist = require('./routes/watchlist'),
  search = require('./routes/search'),
  auth = require('./routes/auth');

const app = express(),
  PORT = process.env.PORT || 3000,
  connection = mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('error', function(err) {
  console.error('MongoDB error: %s', err);
});

// console.log(connection);

// Session data setup
const sess = {
  secret: process.env.SESSION_SECRET,
  /*store: new RedisStore({
    client: redis.createClient(process.env.REDIS_URL),
  }),*/
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 5*60,
  }),
  resave: false,
  saveUninitialized: false,
  ttl: 3600,
  cookie: { 
    secure: false,
    httpOnly: false,
  },
}

// Redirect to HTTPS if not already
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === "production") {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else if (req.header('x-forwarded-proto') === 'https') {
    app.set('trust proxy', 1);
    sess.proxy = true;
    next();
  } else {
    next();
  }
})

// Use the build folder files as the client side files needed
app.use(express.static('build'));

app.use(cookieParser());
// Use session
app.use(session(sess));
app.use(passport.initialize());
app.use((req, res, next) => {console.log(req.session); next();})
app.use(passport.session()); // uses the same session as express-session

// POST method details 
app.use(bodyParser.json()); // allows us to read json data
app.use(bodyParser.urlencoded({ extended: false })); // allows us to read POST form data from the URL 
app.use(methodOverride('_method')); // for PUT and DELETE methods since they are not supported

// Logger
app.use(morgan('common'));

// Use routers and ensure the rest of the routes require authentication
app.use('/', index);
app.use('/auth', auth);
app.all('*', checkAuthenticated);
app.use('/watchlist', watchlist);
app.use('/search', search);

// Start Listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated() || process.env.NODE_ENV === "development") {
    console.log('authenticated');
    next();
  } else {
    res.redirect('/auth/failure/');
  }
}
