FROM node:16-alpine as build
RUN mkdir /app
WORKDIR /app
COPY package*.json /app/
RUN npm install -g ionic
RUN npm install
COPY ./ /app/
RUN npm run-script build
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/www /usr/share/nginx/html/