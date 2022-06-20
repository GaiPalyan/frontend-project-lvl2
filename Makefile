install: install-deps
	npx simple-git-hooks

install-deps:
	npm ci

publish:
	npm publish --dry-run

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .
