FROM node:21.7.1-slim

ARG APP_PATH=/ska-src-maltopuft-frontend
ARG PORT=3000

WORKDIR ${APP_PATH}
EXPOSE ${PORT}

RUN (apt update && apt-get install make)

COPY ./package.json ./package-lock.json ./
RUN npm install --prefer-offline --no-audit --progress=false

COPY ./ ./

CMD [ "npm", "run", "dev" ]