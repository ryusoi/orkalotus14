import type { Express } from "express";
import { registerAuthRoutes } from "../services/auth";

export function registerOAuthRoutes(app: Express) {
  registerAuthRoutes(app);
}
