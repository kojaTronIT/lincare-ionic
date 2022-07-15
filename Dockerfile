FROM node:16-alpine as build
WORKDIR /app
COPY ./ /app/
RUN npm install -g ionic
RUN npm install
RUN npm run-script build
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/www/ /usr/share/nginx/html/
