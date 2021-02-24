FROM node:14 as base


FROM base AS reqs

ARG NPM_TOKEN
COPY package.json /buildenv/
COPY package-lock.json /buildenv/
WORKDIR /buildenv/
RUN npm ci


FROM reqs AS test

CMD true # nothing to test yet


FROM reqs as build

COPY /src/ /buildenv/src/
COPY /public/ /buildenv/public/
WORKDIR /buildenv/
RUN npm run build
# COPY ./ /buildenv/
# WORKDIR /buildenv/
# RUN npm run build


FROM 355508092300.dkr.ecr.us-west-2.amazonaws.com/rex/rex-static-nginx:0.07 AS container

WORKDIR /usr/src/app
COPY --from=build /buildenv/build/ /var/www/site/
# COPY env.js.template services.txt /etc/rex/
ENV LOG_LEVEL=info
