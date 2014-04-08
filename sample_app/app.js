var instant = require('../lib/instant')

var app = instant()

app.get('/', function(req, res) {
  res.send("It's alive!")
})

app.listen(3000)