FROM node:25-alpine AS base

# node:25-alpine n’expose pas `corepack` ; on épingle la même version que `packageManager`.
RUN npm install -g pnpm@10.11.0

# Dependencies stage.
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --store-dir=/pnpm/store

# Build stage.
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# Runtime stage.
FROM base AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package.json /app/pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --prod --store-dir=/pnpm/store
COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["pnpm", "start"]
