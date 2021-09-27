readme:
	@cat README.md

start:
	@node index.js

test:
	@jest --runInBand

e2e:
	@./scripts/post.curl

.PHONY: readme start test
