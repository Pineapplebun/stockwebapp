const express = require('express');
const router = express.Router();

// GET request for the home page
router.get('/', function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '..', 'build') });
});

module.exports = router;