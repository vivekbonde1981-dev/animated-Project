FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# STEP 2: Serve using Nginx (Very small and fast)
FROM nginx:stable-alpine
# Copy the 'dist' folder from the build step to Nginx
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]