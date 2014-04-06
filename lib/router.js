var _ = require('underscore')

function Router() {
  this.routes = {
    // get: [
    //   {
    //     regexp: /^...$/i,
    //     callback: [Object]
    //   }
    // ]
  }
  this.middlewares = []
}
exports.Router = Router

Router.prototype.addRoute = function(verb, path, callback) {
  // Get or create a route for the verb
  var routes = this.routes[verb] = this.routes[verb] || []

  this.routes[verb].push({
    regexp: new RegExp("^" + path + "/?$", "i"),
    callback: callback
  })
}

Router.prototype.addMiddleware = function(callback) {
  this.middlewares.push(callback)
}

Router.prototype.handle = function(req, res) {
  var verb = req.method,
      path = req.url,
      routes = this.routes[verb.toLowerCase()],
      route = _.find(routes, function(route) { return route.regexp.test(path) }),
      endpoint

  if (route) {
    endpoint = function() { route.callback(req, res) }
  } else {
    endpoint = function() { notFound(req, res) }
  }

  this.middlewares.reduceRight(function(next, middleware) {
    return function() { middleware(req, res, next) }
  }, endpoint)()
}

function notFound(req, res) {
  res.send(404, 'Not found')
}