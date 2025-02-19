FROM node:22.14-alpine

WORKDIR /usr/src/app

COPY ./eduport /usr/src/app

RUN npm install

RUN npm run build

EXPOSE 80
EXPOSE 81

CMD [ "npm", "run", "serve" ]