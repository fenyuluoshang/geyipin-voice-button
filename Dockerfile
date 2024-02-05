FROM node:20

WORKDIR /app

RUN npm install -g pnpm

COPY . .

RUN cd frontend && pnpm install && pnpm build

RUN cd server && pnpm install

WORKDIR /app

CMD ["node", "run.js"]

EXPOSE 3000

EXPOSE 3100