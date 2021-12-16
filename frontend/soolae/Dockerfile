# frontend/Dockerfile
FROM node:14.17.6
VOLUME /usr/app
VOLUME /usr/static
WORKDIR /usr/app

RUN apt-get update && apt-get install -y nginx
# should have made nginx configuration file to the frontend directory
COPY nginx.conf /etc/nginx/sites-available/nginx.conf
RUN rm /etc/nginx/sites-enabled/default
RUN ln -sf /etc/nginx/sites-available/nginx.conf /etc/nginx/sites-enabled/nginx.conf
RUN mkdir build && ln -s /usr/app/build -r /usr/share/nginx/html
CMD yarn install && yarn build && nginx -g 'daemon off;'

