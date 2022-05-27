FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@latest

EXPOSE 667

ENTRYPOINT echo IP=$IP > .env && g++ seedGenerator.cpp && ./a.out > seed.sql && npm install && npm start
