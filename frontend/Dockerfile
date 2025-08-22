# ---------- build ----------
FROM node:22-alpine AS build
WORKDIR /frontend
COPY package*.json ./
RUN npm ci
COPY . .
RUN apk add --no-cache libc6-compat
RUN npm run build && npm prune --omit=dev

# ---------- run (prod) ----------
FROM node:22-alpine AS run
WORKDIR /frontend
ENV NODE_ENV=production
RUN apk add --no-cache curl
# standalone bundle + static
COPY --from=build /frontend/.next/standalone ./
COPY --from=build /frontend/public ./public
COPY --from=build /frontend/.next/static ./.next/static
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]
