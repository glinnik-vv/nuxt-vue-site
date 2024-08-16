# Use an official Node.js 18 image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy the package*.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose the port
EXPOSE 3000

# Run the command to build the application
RUN npm run build

# Run the command to start the application
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
