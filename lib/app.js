var Router = require('./router').Router,
    Response = require('./response').Response,
    http = require('http'),
    cons = require('consolidate')

function App() {
  var self = this
  // Internal router
  this._router = new Router()
  // The router middleware
  this.router = function(req, res, next) {
    self._router.handle(req, res)
    next()
  }
  this.routerMounted = false // set to true when the router is installed as a middleware

  this.settings = {}
  this.middlewares = []
}
exports.App = App

var methods = ["GET", "POST", "PUT", "DELETE"]

methods.forEach(function(method) {
  App.prototype[method.toLowerCase()] = function(url, callback) {
    this._router.route(method, url, callback)
  }  
})

App.prototype.use = function(middleware) {
  if (middleware === this.router) this.routerMounted = true

  this.middlewares.push(middleware)
}

App.prototype.handle = function(req, res) {
  res.__proto__ = Response.prototype
  res.app = this

  // Make sure the router middleware is there
  if (!this.routerMounted) this.use(this.router)

  var self = this,
      index = 0

  function next() {  
    var middleware = self.middlewares[index++]
    if (!middleware) return

    try {
      // No need for a special case anymore, everything is a middleware!
      middleware(req, res, next)
    } catch(e) {
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

App.prototype.set = function(name, value) {
  this.settings[name] = value
}

App.prototype.render = function(template, locals, callback) {
  var engineName = this.settings['view engine'],
      path = this.settings['views'] + '/' + template + '.' + engineName

  cons[engineName](path, locals, function(err, html) {
    if (err) throw err
    callback(html)
  })
}
