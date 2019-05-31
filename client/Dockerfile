FROM node:lts as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
EXPOSE 8080
RUN yarn
COPY . ./
RUN yarn start