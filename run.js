const child_process = require("child_process");

const frontend_build = child_process.exec("cd frontend && pnpm build");

frontend_build.stderr.on("data", (data) => {
  console.error(`[build]: ${data.toString("utf8")}`);
});
frontend_build.stdout.on("data", (data) => {
  console.log(`[build]: ${data.toString("utf8")}`);
});

frontend_build.addListener("close", start);

function start() {
  const frontend = child_process.exec("cd frontend && pnpm serve");
  const backend = child_process.exec("cd server && pnpm start");

  frontend.stderr.on("data", (data) => {
    console.error(`[frontend]: ${data.toString("utf8")}`);
  });
  frontend.stdout.on("data", (data) => {
    console.log(`[frontend]: ${data.toString("utf8")}`);
  });

  backend.stderr.on("data", (data) => {
    console.error(`[backend]: ${data.toString("utf8")}`);
  });
  backend.stdout.on("data", (data) => {
    console.log(`[backend]: ${data.toString("utf8")}`);
  });
}
