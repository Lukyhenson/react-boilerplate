module.exports = function(app) {
  app.get('/', function(req, res) {
    res.send({ message: 'What the hell are you doing here?' })
  })
}
