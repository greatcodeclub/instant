var Router = require('./router').Router,
    Response = require('./response').Response,
    http = require('http'),
    cons = require('consolidate')

function App() {
  this.router = new Router()
  this.settings = {}
}
exports.App = App

var methods = ["GET", "POST", "PUT", "DELETE"]

methods.forEach(function(method) {
  App.prototype[method.toLowerCase()] = function(url, callback) {
    this.router.route(method, url, callback)
  }  
})

App.prototype.handle = function(req, res) {
  res.__proto__ = Response.prototype
  res.app = this

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
