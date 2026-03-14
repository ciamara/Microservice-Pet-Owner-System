FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/lab5/browser /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
ENV PORT=80
ENV GATEWAY_URL=http://gateway:8080
EXPOSE 80
