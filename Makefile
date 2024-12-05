# Nom de l'image Docker (si applicable)
IMAGE_NAME = transcendence

# Nom du réseau Docker (si applicable)
NETWORK_NAME = django_transcendence

# Commandes Docker Compose
DOCKER_COMPOSE = docker-compose

# Cible par défaut : build
all: build

# Construire les conteneurs et les démarrer
build:
	$(DOCKER_COMPOSE) up -d --build


# Arrêter et supprimer les conteneurs
stop:
	$(DOCKER_COMPOSE) down

# Nettoyer toutes les ressources Docker associées
clean: stop
	@if [ "$$(docker volume ls -q)" ]; then \
		docker volume rm $$(docker volume ls -q | grep 'transcendence') || true; \
	fi
# Nettoyer les images Docker inutilisées
prune:
	docker system prune -af

# Nettoyer toutes les ressources Docker et les images inutilisées
fclean: clean prune

# Supprimer les conteneurs, les volumes et le réseau Dockeret tut relancer
re : fclean	all

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