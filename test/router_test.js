var assert = require('assert'),
    Router = require('../lib/router').Router

describe('Router', function() {
  beforeEach(function () {
    this.router = new Router()
  })

  it('route GET', function () {
    var called
    this.router.route('get', '/', function() { called = true })
    this.router.handle({ method: 'GET', url: '/' }, {})
    assert(called)
  })
  
  it('route POST', function () {
    var called
    this.router.route('get', '/', function() {})
    this.router.route('post', '/', function() { called = true })
    this.router.handle({ method: 'POST', url: '/' }, {})
    assert(called)
  })
  
  it('route not found', function () {
    var called
    this.router.handle({ method: 'GET', url: '/' }, { send: function(_status) { called = _status } })
    assert.equal(called, 404)
  })
})