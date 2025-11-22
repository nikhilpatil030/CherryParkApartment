# Multi-stage build for Angular application with SSR
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY angular.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm ci && \
    npm cache clean --force

# Copy source code
COPY src ./src
COPY public ./public
COPY server.ts ./

# Build the Angular application with SSR
RUN npm run build

# Production stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production && \
    npm cache clean --force

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Change ownership to non-root user
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port (Angular SSR typically runs on 4000)
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:4000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the SSR server
CMD ["node", "dist/server/server.mjs"]
