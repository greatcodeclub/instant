var Router = require('./router').Router,
    Response = require('./response').Response,
    http = require('http'),
    cons = require('consolidate')

function App() {
  this.router = new Router()
  this.middlewares = []
  this.settings = {}
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
  res.app = this // Used in res.render

  var self = this,
      index = 0

  function next() {
    var middleware = self.middlewares[index++]

    try {
      if (middleware) {
        middleware(req, res, next)
      } else {
        self.router.handle(req, res)
      }
    } catch (e) {
      if (e.status) {
        res.send(e.status, e.message)
      } else {
        throw e
      }
    }
  }
  next()
}

App.prototype.listen = function(port) {
  var self = this

  var server = http.createServer(function (req, res) {
    self.handle(req, res)
  })

  server.listen(port)
}


// Views

App.prototype.set = function(name, value) {
  this.settings[name] = value
}

App.prototype.render = function(file, locals, callback) {
  var engineName = this.settings['view engine'],
      engine = cons[engineName],
      path = this.settings['views'] + '/' + file + '.' + engineName

  engine(path, locals, function(err, html) {
    if (err) throw err
    callback(html)
  })
}
