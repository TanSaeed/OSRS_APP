import { Router } from "express";
import { Clan } from "../models/clan.model.js";
import { Loadout } from "../models/loadout.model.js";
import { User } from "../models/user.model.js";
import { demoUsers } from "../demo/users.js";

const isDemoMode = process.env.REACT_APP_DEMO === "true";
const publicUserAttributes = ["id", "username", "userRole", "clanId", "createdAt"];

export const userRouter = Router();

userRouter.get("/", async (_req, res) => {
  if (isDemoMode) {
    return res.json(demoUsers);
  }

  try {
    const users = await User.findAll({
      attributes: publicUserAttributes,
      include: [{ model: Clan, as: "clan", attributes: ["id", "clanName"] }],
      order: [["id", "ASC"]],
    });

    res.json(users);
  } catch (error) {
    console.error("Failed to list users", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

userRouter.get("/:id", async (req, res) => {
  if (isDemoMode) {
    const userId = Number(req.params.id);
    const user = demoUsers.find((item) => item.id === userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  }

  try {
    const user = await User.findByPk(Number(req.params.id), {
      attributes: publicUserAttributes,
      include: [
        { model: Clan, as: "clan", attributes: ["id", "clanName"] },
        { model: Loadout, as: "loadout" },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Failed to fetch user", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

userRouter.post("/", async (req, res) => {
  if (isDemoMode) {
    return res.status(403).json({ message: "Demo Mode: Writing is disabled" });
  }

  try {
    const { username, passwordHash, userRole, clanId } = req.body;

    const user = await User.create({
      username,
      passwordHash,
      userRole: userRole ?? "member",
      clanId: clanId ?? null,
    });

    const safeUser = await User.findByPk(user.id, {
      attributes: publicUserAttributes,
    });

    res.status(201).json(safeUser);
  } catch (error) {
    console.error("Failed to create user", error);
    res.status(500).json({ message: "Failed to create user" });
  }
});

userRouter.put("/:id", async (req, res) => {
  if (isDemoMode) {
    return res.status(403).json({ message: "Demo Mode: Writing is disabled" });
  }

  try {
    const user = await User.findByPk(Number(req.params.id));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { username, passwordHash, userRole, clanId } = req.body;

    if (username !== undefined) {
      user.username = username;
    }

    if (passwordHash !== undefined) {
      user.passwordHash = passwordHash;
    }

    if (userRole !== undefined) {
      user.userRole = userRole;
    }

    if (clanId !== undefined) {
      user.clanId = clanId;
    }

    await user.save();

    const safeUser = await User.findByPk(user.id, {
      attributes: publicUserAttributes,
    });

    res.json(safeUser);
  } catch (error) {
    console.error("Failed to update user", error);
    res.status(500).json({ message: "Failed to update user" });
  }
});

userRouter.delete("/:id", async (req, res) => {
  if (isDemoMode) {
    return res.status(403).json({ message: "Demo Mode: Writing is disabled" });
  }

  try {
    const user = await User.findByPk(Number(req.params.id));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete user", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});
