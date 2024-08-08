# Stage 1 - build the react app
FROM node:20-alpine as builder

WORKDIR /app

# copy package.json
COPY package*.json .

# install packages
RUN npm install

# copy all other files
COPY . .

# build the project
RUN npm run build


# Stage 2 - serving the app with Nginx
FROM nginx:alpine

# copy the build from the builder stage
COPY --from=builder /app/dist usr/share/nginx/html

# copy the Nginx config file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# expose port 80
EXPOSE 80

# start Nginx
CMD ["nginx", "-g", "daemon off;"]