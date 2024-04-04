# Development stage
FROM node:18 as development

# Set the server working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install 

# Copy the rest of the files
COPY ./src ./src
COPY ./prisma ./prisma

# Generate Prisma Client 
RUN npx prisma generate

# Execute Prisma Migrations
RUN npx prisma migrate dev

CMD [ "npm", "run", "dev" ]

# Builder stage
# FROM development as builder
# WORKDIR /usr/src/app
# Build the app with devDependencies still installed from "development" stage
# RUN npm run build
# Clear dependencies and reinstall for production (no devDependencies)
# RUN rm -rf node_modules
# RUN npm ci --only=production

# Production stage
# FROM alpine:latest as production
# RUN apk --no-cache add nodejs ca-certificates
# WORKDIR /root/
# COPY --from=builder /usr/src/app ./
# CMD [ "node", "./build/index.js" ]