# Stage 1: Build the Vite React App
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the server
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built files from the previous stage
COPY --from=build /app/dist /app/dist

# Copy server.js file to the container
COPY server.mjs .

# Install only necessary dependencies for running the server
RUN npm install express

# Expose port 3000
EXPOSE 3000

# Command to run the Node server
CMD ["node", "server.mjs"]
