var Router = require('./router').Router,
    Response = require('./response').Response,
    http = require('http')

function App() {
  this.router = new Router()
}
exports.App = App

var methods = ["GET", "POST", "PUT", "DELETE"]

methods.forEach(function(method) {
  App.prototype[method.toLowerCase()] = function(url, callback) {
    this.router.route(method, url, callback)
  }  
})

App.prototype.all = function(path, callback) {
  var self = this
  methods.forEach(function(method) {
    self.router.route(method, path, callback)
  })
}

App.prototype.handle = function(req, res) {
  res.__proto__ = Response.prototype

  try {
    this.router.handle(req, res)    
  } catch(e) {
    if (e.status) {
      res.send(e.status, e.message)
    } else {
      throw e
    }
  }
}

App.prototype.listen = function(port) {
  var self = this

  var server = http.createServer(function (req, res) {
    self.handle(req, res)
  })

  server.listen(port)
}
