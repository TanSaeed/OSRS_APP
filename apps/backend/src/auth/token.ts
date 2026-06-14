import { createHmac, timingSafeEqual } from "node:crypto";
import type { UserRole } from "../models/user.model.js";

export interface AuthTokenPayload {
  id: number;
  username: string;
  userRole: UserRole;
}

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is required");
  }

  return secret;
};

const encodeBase64Url = (value: object | string) => {
  const input = typeof value === "string" ? value : JSON.stringify(value);
  return Buffer.from(input).toString("base64url");
};

const sign = (input: string) => {
  return createHmac("sha256", getJwtSecret()).update(input).digest("base64url");
};

export const createAuthToken = (payload: AuthTokenPayload) => {
  const header = encodeBase64Url({ alg: "HS256", typ: "JWT" });
  const body = encodeBase64Url(payload);
  const signature = sign(`${header}.${body}`);

  return `${header}.${body}.${signature}`;
};

export const verifyAuthToken = (token: string): AuthTokenPayload | null => {
  const [header, body, signature] = token.split(".");

  if (!header || !body || !signature) {
    return null;
  }

  const expectedSignature = sign(`${header}.${body}`);
  const expected = Buffer.from(expectedSignature);
  const actual = Buffer.from(signature);

  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return null;
  }

  return JSON.parse(Buffer.from(body, "base64url").toString()) as AuthTokenPayload;
};
