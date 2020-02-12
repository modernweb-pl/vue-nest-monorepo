FROM node:lts as build-stage

WORKDIR /app

COPY package.json yarn.lock ./
COPY apps/web/package.json ./apps/web/
COPY libs/dto/package.json ./libs/dto/

RUN yarn --frozen-lockfile

COPY . .
RUN yarn web build

FROM nginx:stable as production-stage

# This tool converts env vars into json to be injected into the config
ADD https://s3.amazonaws.com/se-com-docs/bins/json_env /usr/local/bin/
RUN chmod +x /usr/local/bin/json_env

COPY apps/web/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY apps/web/docker/expires.conf /etc/nginx/conf.d/expires.conf
COPY apps/web/docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENV CONFIG_FILE_PATH /app/config/app.json

RUN mkdir /app
COPY --from=build-stage /app/dist/web /app
RUN rm -rf /app/config/*

ENTRYPOINT ["entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
