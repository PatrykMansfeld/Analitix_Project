# Base node image version -- 18.12-slim
FROM node:18.12-slim as builder

# Setup workdir for builder
WORKDIR /usr/src/web_app

# Copy and install app dependencies from package.json
COPY package.json ./
RUN npm install

# Copy application source code to workdir
COPY . .

#RUN npm run build

# Start react dev server
CMD ["npm", "start"]




