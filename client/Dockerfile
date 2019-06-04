FROM node:lts as client-smarvelrenting
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn
COPY . ./
CMD [ "yarn", "start" ]