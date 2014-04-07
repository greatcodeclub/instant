var assert = require('assert'),
    App = require('../lib/app').App

describe('App', function() {
  beforeEach(function() {
    this.app = new App()
  })

  it('route GET', function() {
    var called
    
    this.app.get('/', function() { called = true })
    
    this.app.handle({ method: 'GET', url: '/' }, {})
    
    assert(called)
  })

  it('call middlewares', function() {
    var called
    
    this.app.use(function(req, res, next) { next() })
    this.app.use(function() { called = true })

    this.app.handle({ method: 'GET', url: '/' }, {})
    
    assert(called)
  })
})