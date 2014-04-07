var assert = require('assert'),
    App = require('../lib/app').App,
    Response = require('../lib/response').Response

describe('Views', function() {
  beforeEach(function () {
    this.app = new App()
    this.res = new Response()
    this.res.app = this.app

    this.app.engine('jade', function(path, locals, callback) {
      callback(null, 'ok')
    })
  })

  it('render from app', function () {
    this.app.render('file', {}, function(html) {
      assert.equal(html, 'ok')
    })
  })

  it('render from response', function () {
    var called
    this.res.send = function(html) { called = html }
    this.res.render('file')
    assert.equal(called, 'ok')
  })
})