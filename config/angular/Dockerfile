# Stage 1: Build the Angular application
FROM node:20.18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json from the angular subdirectory
COPY arn-frontend/package.json arn-frontend/package-lock.json ./

# Install the dependencies
RUN npm install

# Copy all Angular project files from the angular subdirectory
COPY arn-frontend/ ./

# Build the Angular application
RUN npm run build --prod

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the built Angular app from the builder stage to the Nginx web directory
COPY --from=builder /app/dist/arn-frontend /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]