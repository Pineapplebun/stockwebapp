const express = require('express'),
  router = express.Router(),
  indexController = require('./controllers/indexController');

/**
 * GET request for the home page
 */
router.get('/', indexController.index);

module.exports = router;