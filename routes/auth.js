const express = require('express'),
  passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth20'),
  router = express.Router(),
  User = require('../db/models/user');

passport.serializeUser((sessionUser, done) => {
  // user is a document
  // sets the user document _id value in passport: { user: '_id' }
  done(null, sessionUser.id);
});

passport.deserializeUser((id, done) => {
  // receives the id value of user in passport: { user: '_id' }
  User.findById(id)
  .then((sessionUser) => {
    done(null, sessionUser[0]);
  })
  .catch((err) => console.log(err));
  
});

// Use the google oauth strategy when passport.authenticate is called
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  function(accessToken, refreshToken, profile, done) {
    // Check if the user is already registered => add to database, and/or retrieve details to store in session

    // this function is not calling done... don't user findbyone since it can return arbitrary docs
    User.find({ providerUserId: profile.id }, function (err, user) {
      if (err) { return done(err, user); }
      if (!user) { // user==false means not in db
        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          providerUserId: profile.id,
          authProvider: 'google',
          portfolios: [],
        }).save((err) => {
          if (err) { throw err; }
        });

        return done(err, newUser);
      } else {
        // user already signed up and is in our database
        return done(err, user);
      }
    })

    // error occurred
    // return done(null, false, {message: 'Database connection error'});

  })
);

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/failure', successRedirect: '/' }));

router.get('/failure', (req, res) => {
  res
  .status(401)
  .send('login failure');
})

module.exports = router;