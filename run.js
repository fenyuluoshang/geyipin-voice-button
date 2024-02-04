const child_process = require('child_process');

const frontend = child_process.exec('cd frontend && pnpm serve')
const backend = child_process.exec('cd server && pnpm start')
frontend.stdout.on('data', (data)=>{
  console.log(`[frontend]: ${data.toString('utf8')}`)
})

backend.stdout.on('data', (data)=>{
  console.log(`[backend]: ${data.toString('utf8')}`)
})