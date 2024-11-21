FROM nginx:alpine3.19

# Copier le fichier de configuration Nginx
COPY ./nginx.conf /etc/nginx/nginx.conf

# Créer le certificat auto-signé
RUN mkdir -p /etc/nginx/ssl && \
    openssl req -x509 -nodes -days 365 \
    -out /etc/nginx/ssl/transcendence.crt \
    -keyout /etc/nginx/ssl/transcendence.key \
    -subj "/CN=transcendence.com"

# Lancement de Nginx en mode non-déamonné
ENTRYPOINT ["nginx", "-g", "daemon off;"]
