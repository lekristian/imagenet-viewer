# Start from a Node.js image with Bun
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy the package and lock files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application files
COPY . .

# Build the application
RUN bun run build

# Expose the port for serving the app
EXPOSE 5173

# Start the application
CMD ["bun", "dev"]