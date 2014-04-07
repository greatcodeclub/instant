var assert = require('assert'),
    sinon = require('sinon'),
    Router = require('../lib/router').Router

describe('Router', function() {
  beforeEach(function() {
    this.router = new Router()
  })

  it('handle GET', function() {
    var callback = sinon.spy()
    
    this.router.route('get', '/', callback)
    
    this.router.handle({ method: 'GET', url: '/' })
    
    assert(callback.called)
  })
  
  it('handle POST', function() {
    var getCallback = sinon.spy(),
        postCallback = sinon.spy()

    this.router.route('get', '/', getCallback)
    this.router.route('post', '/', postCallback)
    
    this.router.handle({ method: 'POST', url: '/' })

    assert(!getCallback.called)
    assert(postCallback.called)
  })
  
  it('handle not found', function() {
    var self = this

    assert.throws(function() {
      self.router.handle({ method: 'GET', url: '/' })
    }, function(err) {
      return err.status == 404
    })
  })
})