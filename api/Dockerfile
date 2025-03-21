# Start from a Node.js image with Bun
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy the package and lock files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the wait script and make it executable
COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

# Copy the rest of the application files
COPY . .

# Build the TypeScript code
RUN bun run build

# Expose the port that your app runs on
EXPOSE 8080

# Start the application
CMD ["sh", "-c", "/app/wait-for-it.sh db:5432 -- bun start"]