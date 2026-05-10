FROM node:25-alpine AS base

# node:25-alpine n’expose pas `corepack` ; on épingle la même version que `packageManager`.
RUN npm install -g pnpm@10.11.0

# Dependencies stage.
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --store-dir=/pnpm/store

COPY tsconfig.json tsconfig.app.json tsconfig.node.json ./
COPY vite.config.ts ./
COPY index.html ./
COPY public ./public
COPY src ./src

ARG VITE_API_URL

ENV VITE_API_URL=$VITE_API_URL

RUN pnpm build

FROM nginx:1.29.6-alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=deps /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
