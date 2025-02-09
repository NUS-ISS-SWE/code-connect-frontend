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
RUN npm run build

# Install serve globally to serve the build folder
RUN npm install -g serve

EXPOSE 3000

# Start the server using "serve"
CMD ["serve", "-s", "dist", "-l", "3000"]