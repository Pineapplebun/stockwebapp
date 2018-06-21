const express = require('express'),
  passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth').OAuthStrategy,
  router = express.Router(),
  User = require('../db/models/user');

// Use the google oauth strategy when passport.authenticate is called
passport.use(new GoogleStrategy({
    consumerKey: process.env.GOOGLE_CONSUMER_KEY,
    consumerSecret: process.env.GOOGLE_CONSUMER_SECRET,
    callbackURL: '/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    // Check if the user is already registered => add to database, and/or retrieve details to store in session
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  })
);

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => { // if valid
    // finally,
    // set a session for the user
    const sess = req.session;
    sess.userid = 'userid';
    res.redirect('/');
  }
)

module.exports = router;