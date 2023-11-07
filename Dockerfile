########
# BASE #
########
FROM node:20.9.0-alpine3.18 as base
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN npm i -g pnpm@8.10.2

################
# DEPENDENCIES #
################
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# Install dependencies
RUN pnpm i --frozen-lockfile

###########
# BUILDER #
###########
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV production
RUN pnpm build

#####################
# PRODUCTION RUNNER #
#####################
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 fastify

COPY --from=builder --chown=fastify:nodejs /app/dist ./dist

# Copy package.json and pnpm-lock.yaml
COPY --from=deps --chown=fastify:nodejs /app/package.json /app/pnpm-lock.yaml ./

RUN npm pkg delete scripts.prepare

# Install production dependencies and prune store
RUN pnpm i --frozen-lockfile --prod && pnpm store prune

USER fastify

ENV HOST 0.0.0.0
ENV PORT 3003

CMD [ "node", 'dist/server.js' ]






