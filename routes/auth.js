const express = require('express');
const router = express.Router();

router.post('/auth/:provider', (req, res) => {
  // Check if id_token is valid
  // if valid, 
  // Check if the user is already registered => add to database, and/or retrieve details to store in session
  // finally,
  // set a session for the user
  const sess = req.session;
  sess.userid = ''; // will create the session in redis
  
  res
  .status(200)
  .json({});

  // if not valid
  // redirect to login page
})

module.exports = router;