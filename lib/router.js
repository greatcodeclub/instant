var _ = require('underscore')

function Router() {
  this.routes = {}
}
exports.Router = Router

Router.prototype.route = function(method, url, callback) {
  var routes = this.routes[method] = this.routes[method] || []

  routes.push({
    regexp: new RegExp("^" + url + "$", "i"),
    callback: callback
  })
}

Router.prototype.handle = function(req, res) {
  var routes = this.routes[req.method],
      route = _.find(routes, function(route) {
        return route.regexp.test(req.url)
      })

  if (route) {
    route.callback(req, res)
  } else {
    var err = new Error("Not found")
    err.status = 404
    throw err
  }
}