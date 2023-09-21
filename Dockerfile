FROM node:18.17.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV APP_PORT=3000

CMD ["npm", "run", "dev"]
