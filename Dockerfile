FROM node:16-alpine as build
RUN apk add --no-cache nodejs npm && \
apk upgrade --no-cache --available && \
npm config set unsafe-perm true && \
npm install -g @angular/cli npm-snapshot && \
npm cache clean --force
RUN mkdir /app
WORKDIR /app
COPY package*.json /app/
RUN npm install -g ionic
RUN npm install && \
ng build --prod && ls -la
COPY ./www/ /app/
FROM nginx:latest AS release
COPY --from=dev /app/www/ /usr/share/nginx/html/



