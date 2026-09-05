import type { Express } from "express";
import { registerStorageRoutes } from "../services/storage";

export function registerStorageProxy(app: Express) {
  registerStorageRoutes(app);
}
