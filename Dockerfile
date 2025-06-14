FROM node:latest AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install -g npm@11.4.2 && npm install -g typescript && npm i --save-dev @types/node
COPY . .
COPY tsconfig.json ./

RUN npm run build

CMD [ "node", "lib/index.js" ]