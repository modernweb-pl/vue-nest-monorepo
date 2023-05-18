FROM node:16 as builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY apps/api/package.json apps/api/
COPY libs/dto/package.json libs/dto/
RUN yarn --frozen-lockfile

COPY tsconfig.json .
COPY apps/api apps/api
COPY libs libs

RUN yarn api build

### Production image

FROM node:16-slim as app

WORKDIR /app
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000

COPY package.json yarn.lock ./
COPY apps/api/package.json apps/api/
COPY libs/dto/package.json libs/dto/
RUN yarn --frozen-lockfile && rm -rf apps libs package.json yarn.lock

COPY --from=builder /app/dist/api .

USER node

CMD ["node", "main.js"]
