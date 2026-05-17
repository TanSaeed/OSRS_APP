import { Router } from "express";
import { Clan } from "../models/clan.model.js";
import { Loot } from "../models/loot.model.js";
import { User } from "../models/user.model.js";
import { demoLoot } from "../demo/loot.js";

const isDemoMode = process.env.REACT_APP_DEMO === "true";

export const lootRouter = Router();

lootRouter.get("/", async (_req, res) => {
  if (isDemoMode) {
    return res.json(demoLoot);
  }

  try {
    const loot = await Loot.findAll({
      include: [
        { model: User, as: "addedByUser", attributes: ["id", "username", "userRole"] },
        { model: Clan, as: "clan", attributes: ["id", "clanName"] },
      ],
      order: [["lootId", "ASC"]],
    });

    res.json(loot);
  } catch (error) {
    console.error("Failed to list loot", error);
    res.status(500).json({ message: "Failed to fetch loot" });
  }
});

lootRouter.get("/:id", async (req, res) => {
  if (isDemoMode) {
    const lootId = Number(req.params.id);
    const loot = demoLoot.find((item) => item.lootId === lootId);

    if (!loot) {
      return res.status(404).json({ message: "Loot not found" });
    }

    return res.json(loot);
  }

  try {
    const loot = await Loot.findByPk(Number(req.params.id), {
      include: [
        { model: User, as: "addedByUser", attributes: ["id", "username", "userRole"] },
        { model: Clan, as: "clan", attributes: ["id", "clanName"] },
      ],
    });

    if (!loot) {
      return res.status(404).json({ message: "Loot not found" });
    }

    res.json(loot);
  } catch (error) {
    console.error("Failed to fetch loot", error);
    res.status(500).json({ message: "Failed to fetch loot" });
  }
});

lootRouter.post("/", async (req, res) => {
  if (isDemoMode) {
    return res.status(403).json({ message: "Demo Mode: Writing is disabled" });
  }

  try {
    const { lootId, quantity, addedBy, clanId } = req.body;

    const loot = await Loot.create({
      lootId,
      quantity,
      addedBy: addedBy ?? null,
      clanId: clanId ?? null,
    });

    res.status(201).json(loot);
  } catch (error) {
    console.error("Failed to create loot", error);
    res.status(500).json({ message: "Failed to create loot" });
  }
});

lootRouter.put("/:id", async (req, res) => {
  if (isDemoMode) {
    return res.status(403).json({ message: "Demo Mode: Writing is disabled" });
  }

  try {
    const loot = await Loot.findByPk(Number(req.params.id));

    if (!loot) {
      return res.status(404).json({ message: "Loot not found" });
    }

    const { quantity, addedBy, clanId } = req.body;

    if (quantity !== undefined) {
      loot.quantity = quantity;
    }

    if (addedBy !== undefined) {
      loot.addedBy = addedBy;
    }

    if (clanId !== undefined) {
      loot.clanId = clanId;
    }

    await loot.save();
    res.json(loot);
  } catch (error) {
    console.error("Failed to update loot", error);
    res.status(500).json({ message: "Failed to update loot" });
  }
});

lootRouter.delete("/:id", async (req, res) => {
  if (isDemoMode) {
    return res.status(403).json({ message: "Demo Mode: Writing is disabled" });
  }

  try {
    const loot = await Loot.findByPk(Number(req.params.id));

    if (!loot) {
      return res.status(404).json({ message: "Loot not found" });
    }

    await loot.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete loot", error);
    res.status(500).json({ message: "Failed to delete loot" });
  }
});
