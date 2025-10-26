import { Router } from "express";
import { Clan } from "../models/clan.model.js";
import { User } from "../models/user.model.js";
import { demoClans, type DemoClan } from "../demo/clans.js";

const isDemoMode = process.env.REACT_APP_DEMO === "true";

export const clanRouter = Router();

clanRouter.get("/", async (_req, res) => {
  if (isDemoMode) {
    return res.json(demoClans);
  }

  try {
    const clans = await Clan.findAll({
      include: [{ model: User, as: "leader", attributes: ["id", "username", "userRole"] }],
      order: [["id", "ASC"]],
    });

    res.json(clans);
  } catch (error) {
    console.error("Failed to list clans", error);
    res.status(500).json({ message: "Failed to fetch clans" });
  }
});

clanRouter.get("/:id", async (req, res) => {
  if (isDemoMode) {
    const clanId = Number(req.params.id);
    const clan = demoClans.find((item: DemoClan) => item.id === clanId);

    if (!clan) {
      return res.status(404).json({ message: "Clan not found" });
    }

    return res.json(clan);
  }

  try {
    const clan = await Clan.findByPk(Number(req.params.id), {
      include: [{ model: User, as: "members", attributes: ["id", "username", "userRole"] }],
    });

    if (!clan) {
      return res.status(404).json({ message: "Clan not found" });
    }

    res.json(clan);
  } catch (error) {
    console.error("Failed to fetch clan", error);
    res.status(500).json({ message: "Failed to fetch clan" });
  }
});

clanRouter.post("/", async (req, res) => {
  if (isDemoMode) {
    return res.status(403).json({ message: "Demo mode: writing is disabled" });
  }

  try {
    const { clanName, leaderId } = req.body;

    const clan = await Clan.create({
      clanName: clanName ?? null,
      leaderId: leaderId ?? null,
    });

    res.status(201).json(clan);
  } catch (error) {
    console.error("Failed to create clan", error);
    res.status(500).json({ message: "Failed to create clan" });
  }
});

clanRouter.put("/:id", async (req, res) => {
  if (isDemoMode) {
    return res.status(403).json({ message: "Demo mode: writing is disabled" });
  }

  try {
    const { clanName, leaderId } = req.body;
    const clan = await Clan.findByPk(Number(req.params.id));

    if (!clan) {
      return res.status(404).json({ message: "Clan not found" });
    }

    clan.clanName = clanName ?? clan.clanName;
    clan.leaderId = leaderId ?? clan.leaderId;
    await clan.save();

    res.json(clan);
  } catch (error) {
    console.error("Failed to update clan", error);
    res.status(500).json({ message: "Failed to update clan" });
  }
});

clanRouter.delete("/:id", async (req, res) => {
  if (isDemoMode) {
    return res.status(403).json({ message: "Demo mode: writing is disabled" });
  }

  try {
    const clan = await Clan.findByPk(Number(req.params.id));

    if (!clan) {
      return res.status(404).json({ message: "Clan not found" });
    }

    await clan.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete clan", error);
    res.status(500).json({ message: "Failed to delete clan" });
  }
});
