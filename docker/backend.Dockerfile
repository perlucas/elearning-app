FROM node:22.14-alpine

WORKDIR /usr/src/app

COPY ./backend/package.json /usr/src/app
COPY ./backend/yarn.lock /usr/src/app

RUN yarn install
COPY ./backend/ /usr/src/app

RUN yarn global add @nestjs/cli sequelize-cli

EXPOSE 80

CMD [ "yarn", "run", "start:dev" ]