# syntax=docker/dockerfile:1

FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

# Local development only: sources are bind-mounted over /app by
# docker-compose.dev.yml, so nothing is COPYed in beyond the dependencies.
# Kept above `runner` so `runner` stays the default build target for CI.
FROM node:20-alpine AS dev
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--config", "vite.config.docker.ts"]

FROM nginx:1.27-alpine AS runner
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
