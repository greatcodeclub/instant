var assert = require('assert'),
    Router = require('../lib/router').Router

describe('Router', function() {
  beforeEach(function() {
    this.router = new Router()
  })

  it('stores routes', function () {
    var callback = function() {}
    this.router.route('GET', '/', callback)
    this.router.route('POST', '/login', callback)
    
    assert.deepEqual(this.router.routes, {
      GET: [
        {
          regexp: new RegExp("^/$", "i"),
          callback: callback          
        }
      ],
      POST: [
        {
          regexp: new RegExp("^/login$", "i"),
          callback: callback          
        }
      ]
    })
  })

  it('handle GET', function() {
    var called
    
    this.router.route('GET', '/hi', function() { called = true })
    
    this.router.handle({ method: 'GET', url: '/hi' }, {})
    
    assert(called, "Should call get route")
  })
  
  it('handle POST', function() {
    var getCalled, postCalled

    this.router.route('GET', '/',  function() { getCalled = true })
    this.router.route('POST', '/', function() { postCalled = true })
    
    this.router.handle({ method: 'POST', url: '/' }, {})

    assert(!getCalled, "Shouldn't call post route")
    assert(postCalled, "Should call post route")
  })
  
  it('handle not found', function() {
    var self = this

    assert.throws(function() {
      self.router.handle({ method: 'GET', url: '/' }, {})
    }, function(err) {
      return err.status == 404
    }, "Should throw 404 error")
  })
})