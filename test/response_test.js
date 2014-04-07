var assert = require('assert'),
    Response = require('../lib/response').Response

describe('Response', function() {
  beforeEach(function() {
    this.res = new Response()

    // Mock response writting methods
    var self = this
    this.res.writeHead = function(status, headers) {
      self.written = {
        status: status,
        headers: headers
      }
    }
    this.res.end = function(body) {
      self.written.body = body
    }
  })

  it('send body', function() {
    var called
    
    this.res.send('hi')

    assert.equal(this.written.status, 200)
    assert.equal(this.written.headers['Content-Length'], 2)
    assert.equal(this.written.headers['Content-Type'], 'text/html')
    assert.equal(this.written.body, 'hi')
  })

  it('send status and body', function() {
    var called
    
    this.res.send(500, 'Oops')
    
    assert.equal(this.written.status, 500)
    assert.equal(this.written.body, 'Oops')
  })
})