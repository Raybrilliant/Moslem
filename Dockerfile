FROM oven/bun:1.4.2
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

ENV NODE_ENV=production
EXPOSE 3000

# dua proses: push server internal (:5175) + web app (:3000)
CMD ["sh", "-c", "bun server/index.ts & exec bun build/index.js"]
