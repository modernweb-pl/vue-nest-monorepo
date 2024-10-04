FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

FROM base AS build

COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm build
RUN pnpm deploy --filter=api --prod /prod/api
RUN pnpm deploy --filter=web --prod /prod/web

FROM base AS api

WORKDIR /app
COPY --from=build /prod/api /app
EXPOSE 3000
CMD ["node", "dist/main.js"]

FROM nginx:stable AS web

# This tool converts env vars into json to be injected into the config
ADD https://s3.amazonaws.com/se-com-docs/bins/json_env /usr/local/bin/
RUN chmod +x /usr/local/bin/json_env

COPY apps/web/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY apps/web/docker/expires.conf /etc/nginx/conf.d/expires.conf
COPY apps/web/docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENV CONFIG_FILE_PATH=/app/config/app.json

WORKDIR /app
COPY --from=build /prod/web/dist /app
RUN rm -rf /app/config/*

ENTRYPOINT ["entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
