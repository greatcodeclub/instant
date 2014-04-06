var Router = require('./router').Router,
    Response = require('./response').Response,
    http = require('http')

function App() {
  this.router = new Router()
}
exports.App = App

var methods = ['get', 'post', 'put', 'patch', 'delete']

methods.forEach(function(method) {
  App.prototype[verb] = function(path, callback) {
    this.router.addRoute(verb, path, callback)
  }
})

App.prototype.use = function(path, callback) {
  this.router.addMiddleware(path, callback)
}

App.prototype.handle = function(req, res) {
  res.__proto__ = Response.prototype
  req.app = res.app = this

  this.router.handle(req, res)
}

App.prototype.engine = function(ext, callback) {
  this.view = {
    ext: ext,
    callback: callback
  }
}

App.prototype.render = function(file, locals, callback) {
  var path = 'views/' + file + '.' + this.view.ext

  this.view.callback(path, locals, function(err, html) {
    if (err) throw err
    callback(html)
  })
}

App.prototype.listen = function(port, address) {
  var app = this

  var server = http.createServer(function (req, res) {
    app.handle(req, res)
  })

  server.listen(port, address)
}