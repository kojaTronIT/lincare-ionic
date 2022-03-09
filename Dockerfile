FROM node:0.12

COPY . /www/app

RUN npm install -g ionic
RUN npm install

EXPOSE 8100

ENTRYPOINT ["ionic"]
CMD ["serve", "8100", "--address", "0.0.0.0"]
