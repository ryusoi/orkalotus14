import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { parse as parseCookieHeader } from "cookie";
import type { Request } from "express";
import { SignJWT, jwtVerify } from "jose";
import { config } from "../../config";
import * as db from "../../db";
import type { User } from "../../../drizzle/schema";
import { IAuthService, SessionPayload } from "./types";

export class JWTAuthService implements IAuthService {
  private secretKey: Uint8Array;

  constructor() {
    this.secretKey = new TextEncoder().encode(config.jwtSecret);
  }

  async createSessionToken(
    openId: string,
    options: { expiresInMs?: number; name?: string; email?: string; role?: "user" | "admin" } = {}
  ): Promise<string> {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1000);

    return new SignJWT({
      openId,
      appId: "orka-lotus-guest-experience",
      name: options.name || "",
      email: options.email || null,
      role: options.role || "user",
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(expirationSeconds)
      .sign(this.secretKey);
  }

  async verifySessionToken(token: string): Promise<SessionPayload | null> {
    if (!token) return null;

    try {
      const { payload } = await jwtVerify(token, this.secretKey, {
        algorithms: ["HS256"],
      });

      const { openId, appId, name, email, role } = payload as Record<string, unknown>;

      if (typeof openId !== "string" || !openId) {
        return null;
      }

      return {
        openId,
        appId: typeof appId === "string" ? appId : undefined,
        name: typeof name === "string" ? name : undefined,
        email: typeof email === "string" ? email : null,
        role: role === "admin" ? "admin" : "user",
      };
    } catch {
      return null;
    }
  }

  private parseCookies(cookieHeader: string | undefined): Map<string, string> {
    if (!cookieHeader) return new Map();
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }

  async authenticateRequest(req: Request): Promise<User | null> {
    const cookies = this.parseCookies(req.headers.cookie);
    let sessionToken = cookies.get(config.sessionCookieName || COOKIE_NAME);

    if (!sessionToken) {
      const authHeader = req.headers.authorization;
      if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
        sessionToken = authHeader.slice(7);
      }
    }

    if (!sessionToken) return null;

    const payload = await this.verifySessionToken(sessionToken);
    if (!payload) return null;

    let user = await db.getUserByOpenId(payload.openId);

    // If user not in database yet, auto-provision
    if (!user) {
      const isAdmin =
        payload.role === "admin" ||
        payload.openId === config.adminOpenId ||
        (Boolean(payload.email) && payload.email === config.adminEmail);

      await db.upsertUser({
        openId: payload.openId,
        name: payload.name || null,
        email: payload.email || null,
        loginMethod: "local-jwt",
        role: isAdmin ? "admin" : "user",
        lastSignedIn: new Date(),
      });

      user = await db.getUserByOpenId(payload.openId);
    } else {
      await db.upsertUser({
        openId: user.openId,
        lastSignedIn: new Date(),
      });
    }

    return user ?? null;
  }
}
