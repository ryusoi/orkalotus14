import type { Request } from "express";
import type { User } from "../../../drizzle/schema";

export interface SessionPayload {
  openId: string;
  appId?: string;
  name?: string;
  email?: string | null;
  role?: "user" | "admin";
}

export interface IAuthService {
  createSessionToken(
    openId: string,
    options?: { expiresInMs?: number; name?: string; email?: string; role?: "user" | "admin" }
  ): Promise<string>;

  verifySessionToken(token: string): Promise<SessionPayload | null>;

  authenticateRequest(req: Request): Promise<User | null>;
}
