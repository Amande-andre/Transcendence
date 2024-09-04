# Nom de l'image Docker (si applicable)
IMAGE_NAME = transcendence

# Nom du réseau Docker (si applicable)
NETWORK_NAME = transcendence

# Commandes Docker Compose
DOCKER_COMPOSE = docker-compose

# Cible par défaut : build
all: build

# Construire les conteneurs et les démarrer
build:
	$(DOCKER_COMPOSE) up -d

# Arrêter et supprimer les conteneurs
stop:
	$(DOCKER_COMPOSE) down

# Nettoyer toutes les ressources Docker associées
clean: stop
	docker volume rm $(IMAGE_NAME)_pgdb $(IMAGE_NAME)_transcendencestatics $(IMAGE_NAME)_transcendencemedias || true
	docker network rm $(NETWORK_NAME) || true

# Nettoyer les images Docker inutilisées
prune:
	docker system prune -a -f

# Nettoyer toutes les ressources Docker et les images inutilisées
clean-all: clean prune

# Afficher les conteneurs en cours d'exécution
status:
	docker ps

# Afficher les conteneurs stoppés
status-all:
	docker ps -a


# all : La cible par défaut, qui appelle build pour construire et démarrer les conteneurs.

# build : Construit et démarre les conteneurs définis dans docker-compose.yml.

# stop : Arrête et supprime les conteneurs sans supprimer les volumes et les réseaux.

# clean : Arrête et supprime les conteneurs, puis supprime les volumes et le réseau associés. L'utilisation de || true évite les erreurs si les volumes ou le réseau n'existent pas.

# prune : Supprime les images Docker inutilisées.

# clean-all : Nettoie toutes les ressources Docker (conteneurs, volumes, réseaux) et les images inutilisées.

# status : Affiche les conteneurs en cours d'exécution.

# status-all : Affiche tous les conteneurs, qu'ils soient en cours d'exécution ou non.