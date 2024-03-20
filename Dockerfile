FROM node:21.7.1-alpine3.18

ARG APP_PATH=/ska-src-maltopuft-frontend
ARG PORT=3000

WORKDIR ${APP_PATH}
EXPOSE ${PORT}

RUN apk update

COPY ./package.json ./package-lock.json ./
RUN npm install --prefer-offline --no-audit --progress=false

COPY ./ ./

CMD [ "npm", "run", "dev" ]