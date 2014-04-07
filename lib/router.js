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

Router.prototype.route = function(method, url, callback) {
  // Get or create a route for the method
  var routes = this.routes[method] = this.routes[method] || []

  this.routes[method].push({
    regexp: new RegExp("^" + url + "$", "i"),
    callback: callback
  })
}

Router.prototype.handle = function(req, res) {
  var routes = this.routes[req.method.toLowerCase()],
      route = _.find(routes, function(route) {
        return route.regexp.test(req.url)
      })

  if (route) {
    route.callback(req, res)
  } else {
    var error = new Error("Not found")
    error.status = 404
    throw error
  }
}
