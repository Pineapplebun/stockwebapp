module.exports = {
  index,
}

function index(req, res) {
  res
  .status(200)
  .cookie('last_resource_request', '/', { maxAge: 600000 })
  .sendFile('index.html', { root: path.join(__dirname, '..', 'build') });
}