# Base image
FROM node:16-bullseye AS development

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN npm i -g @nestjs/cli

ENTRYPOINT ["yarn", "start:dev"]