FROM node:20.18-alpine AS builder

WORKDIR /app

COPY arn-frontend/package.json arn-frontend/package-lock.json ./
RUN npm install

COPY arn-frontend/ ./
RUN npm run build --prod

FROM nginx:alpine

COPY arn-frontend/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/arn-frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]