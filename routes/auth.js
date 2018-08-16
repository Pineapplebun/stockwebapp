const express = require('express'),
  passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth20'),
  router = express.Router(),
  authController = require('./controllers/authController');

passport.serializeUser(authController.serializeUser);
passport.deserializeUser(authController.deserializeUser);

// Use the google oauth strategy when passport.authenticate is called
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  authController.createOrSignIn)
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