FROM node:10-alpine

WORKDIR /react-apollo

COPY package.json ./

COPY packages/back/package.json ./packages/back/
COPY packages/front/package.json ./packages/front/

COPY . .

RUN yarn install

RUN yarn workspace front build

RUN yarn workspace front build-ssr

RUN apk add --no-cache bash

RUN chmod +x ./wait-for-it.sh

