FROM node:20

WORKDIR /app

RUN npm install -g pnpm --registry https://registry.npmmirror.com/

RUN npm install -g pm2 --registry https://registry.npmmirror.com/

COPY . .

RUN cd frontend && pnpm install && pnpm build

RUN cd server && pnpm install

WORKDIR /app

CMD ["sh", "./start.sh"]

EXPOSE 3000

EXPOSE 3100