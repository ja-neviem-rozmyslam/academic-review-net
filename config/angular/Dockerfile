FROM node:20.18-alpine AS builder

WORKDIR /app

COPY . /app
COPY /arn-frontend/package.json /arn-frontend/package-lock.json ./

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]

#WORKDIR /app

#COPY /arn-frontend/package.json /arn-frontend/package-lock.json ./
#RUN npm install

#COPY . .

#RUN npm run build

#FROM nginx:alpine

#COPY --from=builder /app/dist/your-angular-app /usr/share/nginx/html

#EXPOSE 80

#CMD ["nginx", "-g", "daemon off;"]