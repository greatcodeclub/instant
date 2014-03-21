var Router = require('./router').Router,
    Request = require('./request').Request,
    Response = require('./response').Response,
    http = require('http')

function App() {
  this.router = new Router()
}
exports.App = App

var verbs = ['get', 'post', 'put', 'patch', 'delete']

verbs.forEach(function(verb) {
  App.prototype[verb] = function(path, callback) {
    this.router.addRoute(verb, path, callback)
  }
})

App.prototype.use = function(path, callback) {
  this.router.addMiddleware(path, callback)
}

App.prototype.process = function(req, res) {
  req.__proto__ = Request.prototype
  res.__proto__ = Response.prototype
  req.app = res.app = this

  this.router.handle(req, res)
}

App.prototype.engine = function(ext, callback) {
  this.viewExt = ext
  this.engineCallback = callback
}

App.prototype.render = function(file, locals, callback) {
  var path = 'views/' + file + '.' + this.viewExt

  this.engineCallback(path, locals, function(err, html) {
    if (err) throw err
    callback(html)
  })
}

App.prototype.listen = function(port, address) {
  var app = this

  var server = http.createServer(function (req, res) {
    app.process(req, res)
  })

  server.listen(port, address)
}