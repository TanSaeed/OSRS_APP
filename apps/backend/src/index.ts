import express from "express";
import cors from "cors";
import { hello } from "@osrs-app/shared";
import { sequelize } from "./db.js";
import { initModels } from "./models/index.js";
import { clanRouter } from "./routes/clan.routes.js";
import { loadoutRouter } from "./routes/loadout.routes.js";
import { lootRouter } from "./routes/loot.routes.js";
import { userRouter } from "./routes/user.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

initModels();

app.use("/api/clans", clanRouter);
app.use("/api/loadouts", loadoutRouter);
app.use("/api/loot", lootRouter);
app.use("/api/users", userRouter);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database is connected");

    app.listen(4000, () => {
      console.log("🚀 Server is running on http://localhost:4000");
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  }
}

app.get("/", (_req, res) => {
  res.send(`Backend API is running - ${hello()}`);
});

startServer();
