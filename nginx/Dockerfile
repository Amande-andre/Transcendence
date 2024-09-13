FROM nginx:alpine3.19

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# COPY  ../frontend /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

# VOLUME [ "/usr/share/nginx/html" ] // this is not tested

ENTRYPOINT ["nginx", "-g", "daemon off;"]