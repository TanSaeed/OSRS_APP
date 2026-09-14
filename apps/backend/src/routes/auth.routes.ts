import { Router } from "express";
import { createAuthToken } from "../auth/token.js";
import { hashPassword, verifyPassword } from "../auth/password.js";
import { authenticate, type AuthenticatedRequest } from "../middleware/auth.middleware.js";
import { User } from "../models/user.model.js";
import { isDemoMode } from "../config.js";

const publicUserAttributes = ["id", "username", "userRole", "clanId", "createdAt"];

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  if (isDemoMode) {
    return res.status(403).json({ message: "Demo Mode: Writing is disabled" });
  }

  try {
    const { username, password, clanId } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const passwordHash = await hashPassword(password);
    const user = await User.create({
      username,
      passwordHash,
      userRole: "member",
      clanId: clanId ?? null,
    });

    const token = createAuthToken({
      id: user.id,
      username: user.username,
      userRole: user.userRole,
    });

    const safeUser = await User.findByPk(user.id, {
      attributes: publicUserAttributes,
    });

    res.status(201).json({ token, user: safeUser });
  } catch (error) {
    console.error("Failed to register user", error);
    res.status(500).json({ message: "Failed to register user" });
  }
});

authRouter.post("/login", async (req, res) => {
  if (isDemoMode) {
    return res.status(403).json({ message: "Demo mode: authentication is disabled" });
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isValidPassword = await verifyPassword(password, user.passwordHash);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = createAuthToken({
      id: user.id,
      username: user.username,
      userRole: user.userRole,
    });

    const safeUser = await User.findByPk(user.id, {
      attributes: publicUserAttributes,
    });

    res.json({ token, user: safeUser });
  } catch (error) {
    console.error("Failed to login", error);
    res.status(500).json({ message: "Failed to login" });
  }
});

authRouter.get("/me", authenticate, async (req: AuthenticatedRequest, res) => {
  if (isDemoMode) {
    return res.status(403).json({ message: "Demo mode: authentication is disabled" });
  }

  try {
    const user = await User.findByPk(req.auth?.id, {
      attributes: publicUserAttributes,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Failed to fetch current user", error);
    res.status(500).json({ message: "Failed to fetch current user" });
  }
});
