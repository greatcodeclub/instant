var http = require('http')

function Request() {}

Request.prototype = Object.create(http.IncomingMessage.prototype)
Request.prototype.constructor = Request
exports.Request = Request