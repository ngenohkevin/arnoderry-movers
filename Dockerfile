# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Accept build arguments for environment variables (from Dokploy or GitHub Actions)
ARG VITE_TELEGRAM_BOT_TOKEN
ARG VITE_TELEGRAM_CHAT_IDS
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_TEMPLATE_ID
ARG VITE_EMAILJS_PUBLIC_KEY
ARG VITE_EMAILJS_PRIVATE_KEY
ARG VITE_NOTIFICATION_EMAIL
ARG VITE_BUSINESS_PHONE_NUMBER

# Set environment variables for the build
ENV VITE_TELEGRAM_BOT_TOKEN=${VITE_TELEGRAM_BOT_TOKEN}
ENV VITE_TELEGRAM_CHAT_IDS=${VITE_TELEGRAM_CHAT_IDS}
ENV VITE_EMAILJS_SERVICE_ID=${VITE_EMAILJS_SERVICE_ID}
ENV VITE_EMAILJS_TEMPLATE_ID=${VITE_EMAILJS_TEMPLATE_ID}
ENV VITE_EMAILJS_PUBLIC_KEY=${VITE_EMAILJS_PUBLIC_KEY}
ENV VITE_EMAILJS_PRIVATE_KEY=${VITE_EMAILJS_PRIVATE_KEY}
ENV VITE_NOTIFICATION_EMAIL=${VITE_NOTIFICATION_EMAIL}
ENV VITE_BUSINESS_PHONE_NUMBER=${VITE_BUSINESS_PHONE_NUMBER}

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create nginx config to listen on port 3000
RUN echo 'server { \
    listen 3000; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf && \
    rm -f /etc/nginx/conf.d/default.conf.bak

# Expose port 3000 to match dwebstore
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]