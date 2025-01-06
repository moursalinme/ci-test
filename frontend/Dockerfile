FROM node:20-alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY public ./public
COPY src ./src
COPY index.html ./
COPY *.config.js ./

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
