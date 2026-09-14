import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

// Resolve the backend env file relative to this module so commands work from
// either the repository root or apps/backend.
dotenv.config({
  path: fileURLToPath(new URL("../.env", import.meta.url)),
});

export type AppMode = "demo" | "database";

const configuredMode = process.env.APP_MODE?.trim().toLowerCase();
const legacyMode: AppMode | undefined = process.env.REACT_APP_DEMO
  ? process.env.REACT_APP_DEMO === "true"
    ? "demo"
    : "database"
  : undefined;

if (configuredMode && configuredMode !== "demo" && configuredMode !== "database") {
  throw new Error('APP_MODE must be either "demo" or "database"');
}

// Demo is the safe default: a fresh checkout can run without MySQL.
export const appMode: AppMode = configuredMode
  ? (configuredMode as AppMode)
  : (legacyMode ?? "demo");

export const isDemoMode = appMode === "demo";

const databasePort = Number(process.env.DB_PORT ?? "3306");

if (!Number.isInteger(databasePort) || databasePort <= 0) {
  throw new Error("DB_PORT must be a positive integer");
}

export const databaseConfig = {
  database: process.env.DB_NAME ?? "osrs_app",
  username: process.env.DB_USER ?? "osrs_user",
  password: process.env.DB_PASS ?? "osrs_password",
  host: process.env.DB_HOST ?? "127.0.0.1",
  port: databasePort,
};

export const serverPort = Number(process.env.PORT ?? "4000");

if (!Number.isInteger(serverPort) || serverPort <= 0) {
  throw new Error("PORT must be a positive integer");
}
