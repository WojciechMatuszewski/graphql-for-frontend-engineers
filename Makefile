.PHONY: backend frontend setup validate start

start-backend:
	docker-compose up -d

start-frontend:
	 npm start

build-frontend:
	 npm run build

frontend-dependencies:
	 npm install

frontend-units:
	 npm run test

frontend-integration:
	 npm run cy:test

stop-backend:
	docker-compose down

post-validate:
	@echo "Everything looks good. You are ready to start the workshop."

validate:  start-backend frontend-dependencies build-frontend frontend-units frontend-integration stop-backend post-validate

start: start-backend start-frontend

stop: stop-backend
