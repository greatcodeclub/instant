var assert = require('assert'),
    App = require('../lib/app').App
    Response = require('../lib/response').Response

describe('Views', function() {
  beforeEach(function() {
    this.app = new App()
    this.app.set('views', __dirname + '/views')
    this.app.set('view engine', 'jade')
  })

  it('has settings', function() {
    assert.equal(this.app.settings['view engine'], 'jade')
  })

  it('render from app', function() {
    this.app.render('index', { text: 'hi' }, function(html) {
      assert.equal(html, '<p>hi</p>')
    })
  })

  it('render from response', function() {
    var html, res = new Response()
    res.app = this.app

    res.send = function(_html) { html = _html }
    res.render('index', { text: 'hi' })
    assert.equal(html, '<p>hi</p>')
  })

  it('render inside a layout', function () {
    this.app.render('index', { text: 'hi', layout: 'layout' }, function(html) {
      assert.equal(html, '<html><body><p>hi</p></body></html>')
    })
  })
})