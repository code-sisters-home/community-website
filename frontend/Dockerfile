FROM node:22-alpine AS build
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Копируем package файлы и устанавливаем зависимости
COPY package*.json ./
RUN npm ci

# Копируем исходный код
COPY . .

# Устанавливаем переменные окружения для билда
ARG NEXT_PUBLIC_SITE_URL=https://codesisters.net
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}

# Билдим приложение (sitemap генерируется в postbuild)
RUN npm run build && npm prune --omit=dev

FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache curl

# Копируем standalone файлы
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next/static ./.next/static

ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]