FROM node:13-alpine as build
WORKDIR /app
COPY package*.json /app/
RUN npm install -g ionic
RUN npm install
COPY ./ /app/
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/ /usr/share/nginx/html/