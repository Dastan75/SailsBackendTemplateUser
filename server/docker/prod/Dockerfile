FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm -g install sails

RUN npm install

ENV NODE_ENV production

COPY . .

EXPOSE 1337

CMD [ "npm", "start" ]