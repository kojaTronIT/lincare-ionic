FROM nginx:alpine as env
RUN apk add --no-cache nodejs npm && \
apk upgrade --no-cache --available && \
npm config set unsafe-perm true && \
npm install -g ionic && \
npm cache clean --force

RUN mkdir /app
WORKDIR /app
COPY ./ /app/
RUN npm install
RUN npm run-script start
