const express = require('express');
const router = express.Router();

// GET request for the home page
router.get('/', function(req, res) {
    res.sendFile(__dirname + '/build/index.html');
});

module.exports = router;