FROM node:lts as server-smarvelrenting
WORKDIR /usr/src/app
COPY package.json ./
EXPOSE 8080
RUN yarn
COPY . ./
CMD [ "yarn", "start" ]