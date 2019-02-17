FROM node:8.15.0-alpine

ENV ROOT /src
WORKDIR ${ROOT}

COPY yarn.lock ${ROOT}
RUN yarn install --pure-lockfile

COPY . ${ROOT}

EXPOSE 3000
CMD npm start
