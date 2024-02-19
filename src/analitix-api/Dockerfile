# Base node image version -- 18.12-slim
FROM node:18.12-slim

# Creating workdir
WORKDIR /usr/src/analitix_api

# Copy and install app dependencies from package.json
COPY package.json ./
RUN npm install

# Copy application source code to workdir
COPY . .

# Run application
CMD [ "npm", "start" ]