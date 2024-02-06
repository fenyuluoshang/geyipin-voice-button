module.exports = {
  apps: [
    {
      name: "frontend",
      script: "pnpm",
      args: "serve",
      cwd: './frontend'
    },
    {
      name: "backend",
      script: "pnpm",
      args: "start",
      cwd: './server'
    },
  ],
};
