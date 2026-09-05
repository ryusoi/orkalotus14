# Multi-stage build for production-ready portability
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package manifests
COPY package.json pnpm-lock.yaml* bun.lock* package-lock.json* ./

# Install dependencies
RUN npm install

# Copy application source
COPY . .

# Build client and server bundles
RUN npm run build

# Production runtime stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy built artifacts and production dependencies
COPY package.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/client/public ./client/public
COPY --from=builder /app/drizzle ./drizzle

# Create persistent uploads directory
RUN mkdir -p /app/uploads && chown -R node:node /app

USER node

EXPOSE 3000

CMD ["node", "dist/index.js"]
