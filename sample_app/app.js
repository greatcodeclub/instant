var instant = require('../lib/instant'),
    logger = require('morgan'),
    serveStatic = require('serve-static')

var app = instant()

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use(serveStatic(__dirname + '/public'))
// app.use(logger())

// A simple custom logging middleware
app.use(function(req, res, next) {
  console.log(req.method, req.url)
  next()
})

app.get('/', function(req, res) {
  res.render('index', { title: 'Instant' })
})

app.listen(3000)