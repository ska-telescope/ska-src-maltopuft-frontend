include .make/base.mk
include .make/docs.mk


js-format:
	@npm run prettier
	@npm run lint

js-lint:
	@npm run code-analysis

js-unit-test:
	@npm run cypress:component:ci
	@npm run cypress:cov
	@mv .nyc_output/out.json .nyc_output/component-out.json

js-e2e-test:
	@npm run dev &
	@npm run cypress:e2e:ci
	@pkill -9 node
	@npm run cypress:cov
	@mv .nyc_output/out.json .nyc_output/e2e-out.json

js-test:
	@make js-unit-test
	@make js-e2e-test
	@npm run nyc:merge
	@rm .nyc_output/{component,e2e}-out.json
	@npm run cypress:cov:ci
	@mv build/reports/cobertura-coverage.xml build/reports/coverage.xml
	@mv -f coverage build/code-coverage

pre-commit:
	@rm -rf .nyc_output/ build/
	@npm run prettier:fix
	@npm run lint:fix
	@make js-format
	@npm run build
	@make js-test
