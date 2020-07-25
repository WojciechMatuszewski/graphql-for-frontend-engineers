.PHONY: backend frontend setup validate start

build-backend:
	cd backend && docker-compose build

build-frontend:
	cd frontend && npm run build

start-backend:
	cd backend && docker-compose up -d

start-frontend:
	cd frontend && npm start

frontend-dependencies:
	cd frontend && npm install

frontend-units:
	cd frontend && npm run test

frontend-integration:
	cd frontend && npm run cy:test

stop-backend:
	cd backend && docker-compose down

post-validate:
	@echo "Everything looks good. You are ready to start the workshop."

validate: build-backend  start-backend frontend-dependencies build-frontend frontend-units frontend-integration stop-backend post-validate

start: start-backend start-frontend
