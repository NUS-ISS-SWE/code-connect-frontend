# Stage 1: Build
# Use Node.js as a builder
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json package-lock.json ./

# Install project dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application files
COPY . .

# Build the project
RUN npm run build -- --mode production

# Stage 2: Serve with Nginx
FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]