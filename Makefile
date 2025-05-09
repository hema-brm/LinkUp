DOCKER_COMPOSE = docker compose

# Initialize project: install dependencies and start Docker
init:
	cd backend && npm install
	cd frontend && npm install
	$(DOCKER_COMPOSE) up -d

# Prisma: run migration and generate types
migrate:
	@read -p "Migration name: " name; \
	$(DOCKER_COMPOSE) exec backend npx prisma migrate dev --name $$name

generate:
	$(DOCKER_COMPOSE) exec backend npx prisma generate
