var http = require('http')

var server = http.createServer(function (req, res) {
  res.end(req.method + ' ' + req.url)
})

server.listen(3000)
