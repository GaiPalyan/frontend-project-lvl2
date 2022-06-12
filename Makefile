install: install-deps
	npx simple-git-hooks

install-deps:
	npm ci

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .
