FROM node:latest

COPY . .

RUN yarn install

CMD npm start
