# Base image
FROM node:current-slim

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your code
COPY . .

# Start the app
CMD ["npm", "run", "dev"]
