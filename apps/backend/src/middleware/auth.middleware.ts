import type { NextFunction, Request, Response } from "express";
import type { AuthTokenPayload } from "../auth/token.js";
import { verifyAuthToken } from "../auth/token.js";

export interface AuthenticatedRequest extends Request {
  auth?: AuthTokenPayload;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : null;

  if (!token) {
    return res.status(401).json({ message: "Missing auth token" });
  }

  const payload = verifyAuthToken(token);

  if (!payload) {
    return res.status(401).json({ message: "Invalid auth token" });
  }

  req.auth = payload;
  next();
};
