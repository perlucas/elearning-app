FROM node:22.14-alpine

WORKDIR /usr/src/app

COPY ./frontend/package.json /usr/src/app
COPY ./frontend/yarn.lock /usr/src/app

RUN yarn install
COPY ./frontend/ /usr/src/app

EXPOSE 3000

CMD [ "yarn", "dev" ]