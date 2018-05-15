const express = require('express');
const router = express.Router();

// GET request for the home page
router.get('/', function(req, res) {
    res.sendFile('../build/index.html', { root: __dirname });
});

module.exports = router;