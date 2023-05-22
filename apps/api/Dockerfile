FROM node:16 as builder

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/
COPY libs/dto/package.json libs/dto/
RUN pnpm install --frozen-lockfile

COPY tsconfig.json .
COPY apps/api apps/api
COPY libs libs

RUN pnpm api build

### Production image

FROM node:16-slim as app

RUN npm install -g pnpm

WORKDIR /app
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/
COPY libs/dto/package.json libs/dto/
RUN pnpm install --frozen-lockfile && rm -rf apps libs package.json pnpm-lock.yaml

COPY --from=builder /app/dist/api .

USER node

CMD ["node", "main.js"]
