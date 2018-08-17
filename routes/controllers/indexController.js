module.exports = {
    index,
}

function index(req, res) {
    res
    .status(200)
    .cookie('last_resource_request', '/', { maxAge: 600000, httpOnly: true })
    .sendFile('index.html', { root: path.join(__dirname, '..', 'build') });
}
