const path = require('path');
const express = require('express');
const router = express.Router();

// GET request for the home page
router.get('/', function (req, res) {
  res
  .status(200)
  .cookie('testcookie', 'token', { expires: new Date(Date.now() + 600000), httpOnly: true })
  .sendFile('index.html', { root: path.join(__dirname, '..', 'build') });
});

module.exports = router;