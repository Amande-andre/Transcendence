# Nom de l'image Docker (si applicable)
IMAGE_NAME = transcendence

# Nom du réseau Docker (si applicable)
NETWORK_NAME = django_transcendence

# Commandes Docker Compose
DOCKER_COMPOSE = docker-compose

# Filtre pour les volumes liés au projet
VOLUME_FILTER = transcendence

# Cible par défaut : build
all: build

# Construire les conteneurs et les démarrer
build:
	$(DOCKER_COMPOSE) up -d --build

# Arrêter et supprimer les conteneurs
stop:
	$(DOCKER_COMPOSE) down

# Nettoyer les volumes Docker spécifiques au projet
clean: stop
	@if [ "$$(docker volume ls -q | grep '$(VOLUME_FILTER)')" ]; then \
		docker volume rm $$(docker volume ls -q | grep '$(VOLUME_FILTER)') || true; \
	else \
		echo "Aucun volume correspondant à $(VOLUME_FILTER) trouvé."; \
	fi

# Nettoyer les images Docker inutilisées
prune:
	docker system prune -af

# Nettoyer toutes les ressources Docker et les images inutilisées
fclean: clean prune

# Supprimer les conteneurs, les volumes et le réseau Docker et tout relancer
re: fclean all

# Afficher les conteneurs en cours d'exécution
status:
	docker ps

# Afficher tous les conteneurs
status-all:
	docker ps -a
