.PHONY: start-front
start-front: 
	-@cd frontend; npm install; npm run dev

.PHONY: start-back
start-back:
	-@cd backend; bin/rails server -b 'ssl://localhost:3001?key=./config/local_certs/10.0.0.31-key.pem&cert=./config/local_certs/10.0.0.31.pem';

.PHONY: start-app
start-app: 
	-@cd frontend; npm run all
