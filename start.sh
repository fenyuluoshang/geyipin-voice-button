pm2 start ecosystem.config.js --only backend

cd frontend

pnpm build

cd ..

pm2-runtime start ecosystem.config.js