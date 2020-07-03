.PHONY: backend frontend setup validate start

build-backend:
	cd backend && docker-compose build

start-backend:
	cd backend && docker-compose up -d

start-frontend:
	cd frontend && npm start

frontend-dependencies:
	cd frontend && npm install

frontend-units:
	cd frontend && npm run test

stop-backend:
	cd backend && docker-compose down

post-validate:
	@echo "Everything looks good. You are ready to start the workshop."

validate: build-backend start-backend frontend-dependencies frontend-units stop-backend post-validate

start: start-backend start-frontend
