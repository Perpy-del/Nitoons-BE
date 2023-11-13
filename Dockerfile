FROM node:18.18.2-alpine AS builder

WORKDIR /app.ts

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]