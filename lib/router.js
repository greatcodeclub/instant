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
}
exports.Router = Router

Router.prototype.route = function(method, path, callback) {
  // Get or create a route for the method
  var routes = this.routes[method] = this.routes[method] || []

  this.routes[method].push({
    regexp: new RegExp("^" + path + "/?$", "i"),
    callback: callback
  })
}

Router.prototype.handle = function(req, res) {
  var routes = this.routes[req.method.toLowerCase()],
      route = _.find(routes, function(route) { return route.regexp.test(req.url) })

  if (route) {
    route.callback(req, res)
  } else {
    res.send(404, 'Not found')
  }
}
