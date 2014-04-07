BIN = `npm bin`

test:
	${BIN}/mocha --reporter spec

watch:
	${BIN}/mocha --watch --reporter spec

.PHONY: test watch