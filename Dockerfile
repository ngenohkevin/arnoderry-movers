# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Accept build arguments for environment variables
ARG VITE_TELEGRAM_BOT_TOKEN
ARG VITE_TELEGRAM_CHAT_IDS
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_TEMPLATE_ID
ARG VITE_EMAILJS_PUBLIC_KEY
ARG VITE_EMAILJS_PRIVATE_KEY
ARG VITE_NOTIFICATION_EMAIL
ARG VITE_BUSINESS_PHONE_NUMBER

# Create .env file from build arguments
RUN echo "VITE_TELEGRAM_BOT_TOKEN=${VITE_TELEGRAM_BOT_TOKEN}" > .env.production && \
    echo "VITE_TELEGRAM_CHAT_IDS=${VITE_TELEGRAM_CHAT_IDS}" >> .env.production && \
    echo "VITE_EMAILJS_SERVICE_ID=${VITE_EMAILJS_SERVICE_ID}" >> .env.production && \
    echo "VITE_EMAILJS_TEMPLATE_ID=${VITE_EMAILJS_TEMPLATE_ID}" >> .env.production && \
    echo "VITE_EMAILJS_PUBLIC_KEY=${VITE_EMAILJS_PUBLIC_KEY}" >> .env.production && \
    echo "VITE_EMAILJS_PRIVATE_KEY=${VITE_EMAILJS_PRIVATE_KEY}" >> .env.production && \
    echo "VITE_NOTIFICATION_EMAIL=${VITE_NOTIFICATION_EMAIL}" >> .env.production && \
    echo "VITE_BUSINESS_PHONE_NUMBER=${VITE_BUSINESS_PHONE_NUMBER}" >> .env.production

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