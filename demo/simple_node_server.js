var http = require('http')

var server = http.createServer(function (req, res) {
  var body = req.method + ' ' + req.url

  res.writeHead(200, {
    'Content-Length': body.length,
    'Content-Type': 'text/html'
  })

  res.end(body)
})

server.listen(3000)
