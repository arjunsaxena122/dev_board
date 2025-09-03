FROM  node:23-alpine

WORKDIR /devboard

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

CMD  ["npm","run","dev"]