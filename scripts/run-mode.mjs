import { spawn } from "node:child_process";

const mode = process.argv[2];

if (mode !== "demo" && mode !== "database") {
  console.error('Mode must be either "demo" or "database"');
  process.exit(1);
}

const isWindows = process.platform === "win32";
const command = isWindows ? (process.env.ComSpec ?? "cmd.exe") : "pnpm";
const args = isWindows ? ["/d", "/s", "/c", "pnpm.cmd dev"] : ["dev"];

const child = spawn(command, args, {
  stdio: "inherit",
  env: { ...process.env, APP_MODE: mode },
});

child.on("error", (error) => {
  console.error(`Failed to start pnpm: ${error.message}`);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
