var instant = require('../lib/instant')

var app = instant()

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.get('/', function(req, res) {
  res.render('index', { title: 'Instant' })
})

app.listen(3000)