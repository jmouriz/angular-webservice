SOURCE := $(shell grep name package.json | head -1 | cut -d: -f2 | tr -d '" ,')

all: $(SOURCE).min.js

$(SOURCE).min.js: $(SOURCE).js
	@node_modules/.bin/minify $< > $@
