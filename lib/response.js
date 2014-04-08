var http = require('http')

// Our own Response class.
// We make `res` inherit from this to add our own helper methods.
function Response() {}

Response.prototype = Object.create(http.ServerResponse.prototype)
Response.prototype.constructor = Response
exports.Response = Response

// Default Content-Type to HTML.
Response.prototype.contentType = 'text/html'

// Helper to send a response.
// Usage:
//   res.send('body')
//   res.send(404, 'Not found')
Response.prototype.send = function(status, body) {
  if (body == null) {
    body = status
    status = 200
  }

  this.writeHead(status, {
    'Content-Length': body.length,
    'Content-Type': this.contentType
  })

  this.end(body)
}

Response.prototype.render = function(template, locals) {
  var self = this
  
  this.app.render(template, locals, function(html) {
    self.send(html)
  })
}

