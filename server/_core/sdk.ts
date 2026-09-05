import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Request } from "express";
import type { User } from "../../drizzle/schema";
import { config } from "../config";
import { getAuthService } from "../services/auth";
import type { SessionPayload } from "../services/auth/types";

export type AuthenticatedUser = User & {
  taskUid?: string;
  isCron?: boolean;
};

export { SessionPayload };

class DecoupledSDKServer {
  async createSessionToken(
    openId: string,
    options: { expiresInMs?: number; name?: string; role?: "user" | "admin" } = {}
  ): Promise<string> {
    const auth = getAuthService();
    return auth.createSessionToken(openId, options);
  }

  async verifySession(
    cookieValue: string | undefined | null
  ): Promise<{ openId: string; appId: string; name: string } | null> {
    if (!cookieValue) return null;
    const auth = getAuthService();
    const payload = await auth.verifySessionToken(cookieValue);
    if (!payload) return null;
    return {
      openId: payload.openId,
      appId: payload.appId || "orka-lotus-guest-experience",
      name: payload.name || "Guest",
    };
  }

  async authenticateRequest(req: Request): Promise<User> {
    const auth = getAuthService();
    const user = await auth.authenticateRequest(req);
    if (!user) {
      throw new Error("Invalid or missing session cookie");
    }
    return user;
  }

  async exchangeCodeForToken(code: string, _state?: string) {
    return {
      accessToken: `token_${code}`,
      tokenType: "bearer",
      expiresIn: 86400,
      scope: "all",
      idToken: `id_${code}`,
    };
  }

  async getUserInfo(_accessToken: string) {
    return {
      openId: `user_${Date.now()}`,
      projectId: "orka-lotus-guest-experience",
      name: "Guest User",
      email: null,
      platform: "local",
      loginMethod: "local",
    };
  }
}

export const sdk = new DecoupledSDKServer();
