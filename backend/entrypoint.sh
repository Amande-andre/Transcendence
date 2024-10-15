#!/bin/sh

# Appliquer les migrations
if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

sleep 1

# Supprimer les migrations existantes
python manage.py flush --no-input
# Créer les migrations Django
echo "Making migrations..."
python manage.py makemigrations

# Exécuter les migrations Django
echo "Running migrations..."
python manage.py migrate

# collecter les fichiers statiques
python manage.py collectstatic --no-input

# Démarrer Gunicorn
echo "Starting Gunicorn..."
gunicorn --bind 0.0.0.0:8000 --workers 3 transcendence.wsgi:application
