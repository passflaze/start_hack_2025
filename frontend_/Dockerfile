FROM node:18-alpine AS build

WORKDIR /app

COPY /app/package.json /app/package-lock.json ./
RUN npm install

COPY . .
RUN cd /app/app && npm run build

FROM nginx:stable-alpine

COPY --from=build /app/app/dist /usr/share/nginx/html

COPY /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
