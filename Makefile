install: install-deps
	npx simple-git-hooks

install-deps:
	npm ci

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .
