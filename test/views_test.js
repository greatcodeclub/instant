var assert = require('assert'),
    App = require('../lib/app').App
    Response = require('../lib/response').Response

xdescribe('Views', function() {
  beforeEach(function() {
    this.app = new App()
    this.app.set('views', __dirname + '/views')
    this.app.set('view engine', 'jade')
  })

  it('has settings', function() {
    assert.equal(this.app.settings['view engine'], 'jade')
  })

  xit('render from app', function() {
    this.app.render('index', { content: 'hi' }, function(html) {
      assert.equal(html, '<p>hi</p>')
    })
  })

  xit('render from response', function() {
    var html, res = new Response()
    res.app = this.app

    res.send = function(_html) { html = _html }
    res.render('index', { content: 'hi' })
    assert.equal(html, '<p>hi</p>')
  })
})