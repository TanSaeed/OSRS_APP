import express from "express";
import cors from "cors";
import { hello } from "@osrs-app/shared";
import { appMode, isDemoMode, serverPort } from "./config.js";
import { sequelize } from "./db.js";
import { initModels } from "./models/index.js";
import { registerRoutes } from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.json());

initModels();
registerRoutes(app);

async function startServer() {
  try {
    if (isDemoMode) {
      console.log("🧪 Demo mode enabled; MySQL is not required");
    } else {
      await sequelize.authenticate();
      console.log("✅ Database is connected");
    }

    app.listen(serverPort, () => {
      console.log(`🚀 Server is running on http://localhost:${serverPort}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  }
}

app.get("/", (_req, res) => {
  res.send(`Backend API is running - ${hello()}`);
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", mode: appMode });
});

startServer();
