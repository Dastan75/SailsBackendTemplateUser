FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm -g install sails
RUN npm install -g nodemon
RUN npm install

COPY . .

EXPOSE 1337

CMD [ "nodemon", "-w", "api", "-w", "config", "-L" ]