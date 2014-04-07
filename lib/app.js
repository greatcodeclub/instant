var Router = require('./router').Router,
    Response = require('./response').Response,
    http = require('http')

function App() {
  this.router = new Router()
  this.middlewares = []
}
exports.App = App

var methods = ['get', 'post', 'put', 'patch', 'delete']

methods.forEach(function(method) {
  App.prototype[method] = function(path, callback) {
    this.router.route(method, path, callback)
  }
})

App.prototype.use = function(callback) {
  this.middlewares.push(callback)
}

App.prototype.handle = function(req, res) {
  res.__proto__ = Response.prototype
  res.app = this

  var self = this,
      index = 0

  function next() {
    var middleware = self.middlewares[index++]

    if (middleware) {
      middleware(req, res, next)
    } else {
      self.router.handle(req, res)
    }
  }
  next()
}

App.prototype.listen = function(port, address) {
  var self = this

  var server = http.createServer(function (req, res) {
    self.handle(req, res)
  })

  server.listen(port, address)
}


// Views

App.prototype.engine = function(ext, fn) {
  this.view = {
    ext: ext,
    engine: fn
  }
}

App.prototype.render = function(file, locals, callback) {
  var path = 'views/' + file + '.' + this.view.ext

  this.view.engine(path, locals, function(err, html) {
    if (err) throw err
    callback(html)
  })
}
