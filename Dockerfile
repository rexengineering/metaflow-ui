FROM node:14 as base


FROM base AS reqs

ARG NPM_TOKEN
COPY package.json /build/
COPY package-lock.json /build/
WORKDIR /build/
RUN npm ci


FROM req AS test
CMD true # nothing to test yet


FROM regs as build

WORKDIR /build/
RUN npm run build


FROM privatebin/nginx-fpm-alpine:latest AS container
COPY conf.php /src/cfg/conf.php

WORKDIR /usr/src/app
COPY --from=build /build/build/ /var/www/site/
