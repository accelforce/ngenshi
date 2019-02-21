FROM node:8.15.0-alpine

ARG NODE_ENV=development
ENV ROOT /src
WORKDIR ${ROOT}

COPY package.json ${ROOT}
COPY yarn.lock ${ROOT}
RUN yarn install --pure-lockfile

COPY . ${ROOT}

EXPOSE 3000
CMD npm start
