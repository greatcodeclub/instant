# Instant

A project of [The Great Code Club](http://www.greatcodeclub.com/).

Instant is a web framework inspired by Express.

## Usage

    var instant = require('instant')

    var app = instant()

    app.set('views', __dirname + '/views')
    app.set('view engine', 'jade')

    app.use(anyExpressMiddleware())

    app.get('/', function(req, res) {
      res.render('index', { title: 'Instant' })
    })

    app.listen(3000)

## Installation

You need:

- A recent version of [node](http://nodejs.org/).

To install Node modules and compile the parser:

    $ npm install

## License

Copyright 2014 Coded Inc.  
marc@codedinc.com

You are free to modify and distribute this however you want. Except for teaching purposes.
