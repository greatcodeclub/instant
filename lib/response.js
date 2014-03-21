var http = require('http')

function Response() {}

Response.prototype = Object.create(http.ServerResponse.prototype)
Response.prototype.constructor = Response
exports.Response = Response

Response.prototype.contentType = 'text/html'

Response.prototype.send = function(status, body) {
  if (arguments.length === 1) body = status

  this.writeHead(status, {
    'Content-Length': body.length,
    'Content-Type': this.contentType
  })

  this.end(body)
}

Response.prototype.render = function(file, locals) {
  var self = this

  this.app.render(file, locals, function(html) {
    self.send(html)
  })
}