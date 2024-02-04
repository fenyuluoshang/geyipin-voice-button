FROM node:20

WORKDIR /app

RUN npm install -g pnpm

COPY . .

WORKDIR /app/frontend

RUN pnpm install

RUN pnpm build

WORKDIR /app

CMD ['node' 'run.js']

EXPOSE 3000

EXPOSE 3100