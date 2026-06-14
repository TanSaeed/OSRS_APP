import type { Express } from "express";
import { authRouter } from "./auth.routes.js";
import { clanRouter } from "./clan.routes.js";
import { loadoutRouter } from "./loadout.routes.js";
import { lootRouter } from "./loot.routes.js";
import { userRouter } from "./user.routes.js";

export const registerRoutes = (app: Express) => {
  app.use("/api/auth", authRouter);
  app.use("/api/clans", clanRouter);
  app.use("/api/loadouts", loadoutRouter);
  app.use("/api/loot", lootRouter);
  app.use("/api/users", userRouter);
};
