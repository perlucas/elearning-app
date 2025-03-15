FROM node:22.14-alpine

WORKDIR /usr/src/app

COPY ./backend/package.json /usr/src/app
COPY ./backend/yarn.lock /usr/src/app

RUN yarn install
COPY ./backend/ /usr/src/app

EXPOSE 80

CMD [ "yarn", "run", "start:dev" ]