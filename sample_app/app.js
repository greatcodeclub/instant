var instant = require('../lib/instant'),
    logger = require('morgan'),
    serveStatic = require('serve-static'),
    cons = require('consolidate')

var app = instant()

app.engine('jade', cons.jade)

app.use(logger())
app.use(serveStatic('public'))

app.get('/', function(req, res) {
  res.send("It's alive!")
})

app.get('/view', function(req, res) {
  res.render('index', { title: 'Instant' })
})

app.listen(3000)