FROM node:16-alpine

COPY . /www/app

RUN npm install -g ionic
RUN npm install

EXPOSE 8100

CMD ["ionic", "serve"]
