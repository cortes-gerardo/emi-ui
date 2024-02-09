# We don't want to start from scratch.
# That is why we tell node here to use the current node image as base.
# Stage #1
FROM node:21-alpine AS build

# Create an application directory
RUN mkdir -p /app

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY . .

# Install node packages
RUN npm install

# Build the app
RUN npm run build --prod

# Stage #2
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN  rm -rf ./*

COPY --from=build /app/dist/emi-ui/browser .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
