FROM node:19 AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install --dev
COPY . ./
RUN npm run build
ENV HOST=0.0.0.0
EXPOSE 8080
CMD ["npm","run", "preview","--", "--host", "0.0.0.0", "--port","8080"]
