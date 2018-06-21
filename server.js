const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const index = require('./routes/index');
const watchlist = require('./routes/watchlist');
const portfolio = require('./routes/portfolio');
const auth = require('./routes/auth');

// Redirect to HTTPS if not already
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https')
    res.redirect(`https://${req.header('host')}${req.url}`)
  else
    next()
})

// Session data setup
const sess = {
  secret: 'some-private-key',
  key: 'test',
  store: new RedisStore({
    client: redis.createClient(process.env.REDIS_URL),
  }),
  resave: false,
  saveUninitialized: false,
  ttl: 3600,
}

// Use secure if in production
if (app.get('env') === 'production') {
  app.set('trust proxy', '1');
  sess.cookie.secure = true;
}

// Use session
app.use(cookieParser());
app.use(session(sess));

// POST method details 
app.use(bodyParser.json()); // allows us to read json data
app.use(bodyParser.urlencoded({ extended: false })); // allows us to read POST form data from the URL 
app.use(methodOverride('_method')); // for PUT and DELETE methods since they are not supported

// Logger
app.use(morgan('common'));

// Use routers
app.use('/', index);
app.use('/auth', auth);
app.use('/watchlist', watchlist);
app.use('/portfolio', portfolio);

// Use the build folder files as the client side files needed
app.use(express.static('build'));

// Start Listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Adding in our own middleware logger
/*
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
}*/