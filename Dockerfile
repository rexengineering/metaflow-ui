FROM node:14 as start


FROM start AS reqs

ARG NPM_TOKEN
COPY package.json /buildenv/
COPY package-lock.json /buildenv/
COPY .npmrc /buildenv/
WORKDIR /buildenv/
RUN npm ci


FROM reqs as base

COPY /src/ /buildenv/src/
COPY /public/ /buildenv/public/


FROM base as build

WORKDIR /buildenv/
RUN CI=true npm run build


FROM base as lint

WORKDIR /buildenv/
RUN npm run lint


FROM base AS test

WORKDIR /buildenv/
RUN CI=true npm run test:coverage


FROM 355508092300.dkr.ecr.us-west-2.amazonaws.com/rex/rex-static-nginx:b-master AS container

WORKDIR /usr/src/app
COPY --from=build /buildenv/build/ /var/www/site/
COPY env.js.template services.txt /etc/rex/
ENV LOG_LEVEL=info
