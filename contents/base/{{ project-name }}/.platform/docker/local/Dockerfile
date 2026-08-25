FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json pnpm-workspace.yaml .npmrc* ./
# A fresh render carries no pnpm-lock.yaml (the dependency set is decided at render time), so the
# frozen path cannot engage yet. Once `pnpm install` is run once and the lockfile is committed, the
# frozen path engages automatically and stays authoritative — the same conditional the full
# typescript archetypes carry, never backported here because this archetype had no suite.
RUN npm install -g pnpm && if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; else pnpm install; fi
COPY . .
RUN pnpm build

FROM node:22-alpine
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
USER appuser
EXPOSE {{ service_port }} {{ management_port }}
ENTRYPOINT ["node", "dist/index.js"]
