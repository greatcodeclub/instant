BIN = `npm bin`

test: lib/parser.js
	${BIN}/mocha --reporter spec

watch:
	${BIN}/mocha --watch --reporter spec

.PHONY: test watch