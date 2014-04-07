var cons = require('consolidate')

var path = __dirname + "/../sample_app/views/index.jade"
    locals = { title: 'Demo' }

cons.jade(path, locals, function(err, html) {
  if (err) throw err
  console.log(html)
})