FROM node:14 as base


FROM base AS reqs

ARG NPM_TOKEN
COPY package.json /buildenv/
COPY package-lock.json /buildenv/
WORKDIR /buildenv/
RUN npm ci


FROM reqs as code

COPY /src/ /buildenv/src/
COPY /public/ /buildenv/public/


FROM code AS test

WORKDIR /buildenv/
RUN npm run lint
RUN CI=true npm run test:coverage


FROM code as build

WORKDIR /buildenv/
RUN CI=true npm run build


FROM 355508092300.dkr.ecr.us-west-2.amazonaws.com/rex/rex-static-nginx:b-master AS container

WORKDIR /usr/src/app
COPY --from=build /buildenv/build/ /var/www/site/
# COPY env.js.template services.txt /etc/rex/
ENV LOG_LEVEL=info
