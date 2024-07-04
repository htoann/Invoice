# Base image
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install -g npm
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Production image
FROM nginx:1.25.2-alpine

# Copy the built files to Nginx's web root directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]