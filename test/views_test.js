var assert = require('assert'),
    App = require('../lib/app').App,
    Response = require('../lib/response').Response

describe('Views', function() {
  beforeEach(function() {
    this.app = new App()
    this.app.set('views', __dirname + '/views')
    this.app.set('view engine', 'jade')

    this.res = new Response()
    this.res.app = this.app
  })

  it('render from app', function() {
    this.app.render('index', { content: 'hi' }, function(html) {
      assert.equal(html, '<p>hi</p>')
    })
  })

  it('render from response', function() {
    var called
    this.res.send = function(html) { called = html }
    this.res.render('index', { content: 'hi' })
    assert.equal(called, '<p>hi</p>')
  })
})