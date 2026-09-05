import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import { config } from "../../config";
import * as db from "../../db";
import { getSessionCookieOptions } from "../../_core/cookies";
import { JWTAuthService } from "./jwtAuth";
import { IAuthService } from "./types";

let authServiceInstance: IAuthService | null = null;

export function getAuthService(): IAuthService {
  if (!authServiceInstance) {
    authServiceInstance = new JWTAuthService();
  }
  return authServiceInstance;
}

export function registerAuthRoutes(app: Express) {
  const auth = getAuthService();

  // 1. Direct Local / Dev Authentication endpoint (provider-agnostic)
  // Allows signing in with email or username without external OAuth redirect
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, name, role } = req.body as { email?: string; name?: string; role?: "user" | "admin" };
      const userIdentifier = email || `user_${Date.now()}`;
      const userName = name || userIdentifier.split("@")[0] || "Guest";
      const isAdmin = role === "admin" || userIdentifier === config.adminOpenId || userIdentifier === config.adminEmail;

      await db.upsertUser({
        openId: userIdentifier,
        name: userName,
        email: email || null,
        loginMethod: "local",
        role: isAdmin ? "admin" : "user",
        lastSignedIn: new Date(),
      });

      const token = await auth.createSessionToken(userIdentifier, {
        name: userName,
        email: email || undefined,
        role: isAdmin ? "admin" : "user",
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(config.sessionCookieName || COOKIE_NAME, token, {
        ...cookieOptions,
        maxAge: ONE_YEAR_MS,
      });

      res.json({
        success: true,
        user: {
          openId: userIdentifier,
          name: userName,
          email: email || null,
          role: isAdmin ? "admin" : "user",
        },
        token,
      });
    } catch (error) {
      console.error("[Auth] Login error:", error);
      res.status(500).json({ error: "Authentication failed" });
    }
  });

  // 2. Logout endpoint
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    const cookieOptions = getSessionCookieOptions(req);
    res.clearCookie(config.sessionCookieName || COOKIE_NAME, {
      ...cookieOptions,
      maxAge: -1,
    });
    res.json({ success: true });
  });

  // 3. Generic OAuth Callback (for custom OAuth / OIDC integrations)
  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    const code = req.query.code as string | undefined;
    const state = req.query.state as string | undefined;

    if (!code) {
      // If no code, check if there's an active session or redirect to home
      res.redirect(302, "/");
      return;
    }

    try {
      // If an external OAuth token endpoint is configured, exchange it
      if (config.oauth?.tokenUrl && config.oauth?.clientId) {
        const tokenRes = await fetch(config.oauth.tokenUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            client_id: config.oauth.clientId,
            client_secret: config.oauth.clientSecret,
            code,
            grant_type: "authorization_code",
            redirect_uri: config.oauth.callbackUrl,
          }),
        });

        if (tokenRes.ok) {
          const tokenData = (await tokenRes.json()) as { access_token?: string };
          if (tokenData.access_token && config.oauth.userInfoUrl) {
            const userRes = await fetch(config.oauth.userInfoUrl, {
              headers: { Authorization: `Bearer ${tokenData.access_token}` },
            });
            if (userRes.ok) {
              const userInfo = (await userRes.json()) as { id?: string; sub?: string; email?: string; name?: string };
              const openId = userInfo.sub || userInfo.id || userInfo.email || "oauth_user";
              
              await db.upsertUser({
                openId,
                name: userInfo.name || null,
                email: userInfo.email || null,
                loginMethod: "oauth",
                lastSignedIn: new Date(),
              });

              const sessionToken = await auth.createSessionToken(openId, {
                name: userInfo.name,
                email: userInfo.email,
              });

              const cookieOptions = getSessionCookieOptions(req);
              res.cookie(config.sessionCookieName || COOKIE_NAME, sessionToken, {
                ...cookieOptions,
                maxAge: ONE_YEAR_MS,
              });
              res.redirect(302, "/");
              return;
            }
          }
        }
      }

      // Fallback: create session for code
      const sessionToken = await auth.createSessionToken(`oauth_${code.slice(0, 12)}`, {
        name: "OAuth User",
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(config.sessionCookieName || COOKIE_NAME, sessionToken, {
        ...cookieOptions,
        maxAge: ONE_YEAR_MS,
      });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth Callback]", error);
      res.redirect(302, "/");
    }
  });
}
