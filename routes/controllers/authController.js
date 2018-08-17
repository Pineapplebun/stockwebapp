const User = require('../../db/models/user');

module.exports = {
  createOrSignIn,
  serializeUser,
  deserializeUser,
}

function serializeUser(sessionUser, done) {
  // user is a document
  // sets the user document _id value in passport: { user: '_id' }
  // console.log('serialize', sessionUser);
  done(null, sessionUser.id);
};

function deserializeUser(id, done) {
  // receives the id value of user in passport: { user: '_id' }
  User.findById(id)
  .then((sessionUser) => {
    // console.log(sessionUser);
    done(null, sessionUser);
  })
  .catch((err) => console.log(err));
};

// Use the google oauth strategy when passport.authenticate is called
function createOrSignIn(accessToken, refreshToken, profile, done) {
    // Check if the user is already registered => add to database, and/or retrieve details to store in session

    // this function is not calling done... don't user findbyone since it can return arbitrary docs
    User.findOne({ providerUserId: profile.id }, function (err, user) {
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
}
