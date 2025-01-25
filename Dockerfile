# Use the official Node.js image from Docker Hub as the base image
FROM node:20-alpine

# Install bash (if needed)
RUN apk add --no-cache bash postgresql-client

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code and migration script
COPY . .

# Ensure tsconfig.json is present inside the container
RUN ls -alh /app

# build the application
RUN npm run build

RUN rm -rf /app/src/migrations

RUN mkdir /app/src/migrations

# Copy the entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /usr/local/bin/entrypoint.sh

# Run the entrypoint script
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# Expose the port your app will run on (default NestJS port is 5000)
EXPOSE 5000

