const express = require('express'),
  passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth').OAuthStrategy,
  router = express.Router(),
  User = require('../db/models/user');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user);
  });
});

// Use the google oauth strategy when passport.authenticate is called
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  function(accessToken, refreshToken, profile, done) {
    // Check if the user is already registered => add to database, and/or retrieve details to store in session
    User.findOne({ providerUserId: profile.id }, function (err, user) {
      if (err) { return done(err, user); }
      
      // New user
      if (!user) { // user false means not in db
        const user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          providerUserId: profile.id,
          authProvider: 'google',
          portfolios: [],
        });

        // save the user
        user.save(function(err) {
          if (err) { throw err; }
        });
      }
      return done(err, user);

    });
  })
);

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/google/login' }),
  (req, res) => {
    res.redirect('/');
});

module.exports = router;