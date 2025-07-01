# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install @azure/msal-browser@4.14.0 @azure/msal-react@3.0.14

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Set the command to run the production build of the React app
CMD ["npm", "start"]
