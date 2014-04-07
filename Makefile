BIN = `npm bin`

test:
	${BIN}/mocha --reporter spec

watch:
	${BIN}/mocha --watch --reporter min

watch-app:
	${BIN}/nodemon sample_app/app.js

.PHONY: test watch watch-app