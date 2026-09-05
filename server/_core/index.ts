import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { config } from "../config";
import { registerAuthRoutes } from "../services/auth";
import { registerStorageRoutes } from "../services/storage";
import { getLiveMarmarisDate } from "../services/timeService";
import { getLiveMarmarisWeather } from "../services/weatherService";
import { conciergeService } from "../services/conciergeService";
import {
  saveRatingToFirebaseRtdb,
  checkFirebaseRtdbStatus,
  getSavedRatingsAndSummaries,
  flushPendingRatingsToRtdb,
} from "../services/firebaseRtdbService";
import { registerRatingNotificationRoutes } from "../services/ratingNotificationService";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Configure body parser with appropriate size limits
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: Date.now() });
  });

  // Live Marmaris/Google synchronized time API
  app.get("/api/time", (_req, res) => {
    res.json(getLiveMarmarisDate());
  });

  // Live Marmaris/Google synchronized weather API
  app.get("/api/weather", async (req, res) => {
    try {
      const queryLocation = typeof req.query.q === "string" ? req.query.q : undefined;
      const weather = await getLiveMarmarisWeather(queryLocation);
      res.json(weather);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch weather" });
    }
  });

  // AI Concierge Chat API
  app.post("/api/concierge/chat", async (req, res) => {
    try {
      const { message, history, currentPage } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const response = await conciergeService.chat(
        message,
        Array.isArray(history) ? history : [],
        typeof currentPage === "string" ? currentPage : "/"
      );

      res.json(response);
    } catch (err: any) {
      console.error("[Concierge API Error]:", err);
      res.status(500).json({
        error: "Concierge service temporarily unavailable",
        message: err?.message || String(err),
      });
    }
  });

  // Guest Experience Ranking & Realtime Database API
  app.post("/api/ratings", async (req, res) => {
    try {
      const { rating, summary } = req.body;
      if (!rating || !rating.targetId || typeof rating.overallRating !== "number") {
        return res.status(400).json({ error: "Invalid rating submission payload" });
      }

      const result = await saveRatingToFirebaseRtdb(rating, summary);
      res.json(result);
    } catch (err: any) {
      console.error("[Ratings API Error]:", err);
      res.status(500).json({
        success: false,
        error: "Failed to persist rating",
        message: err?.message || String(err),
      });
    }
  });

  app.get("/api/ratings", (_req, res) => {
    try {
      const data = getSavedRatingsAndSummaries();
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: "Failed to fetch ratings" });
    }
  });

  app.get("/api/ratings/status", async (_req, res) => {
    try {
      const status = await checkFirebaseRtdbStatus();
      res.json(status);
    } catch (err: any) {
      res.status(500).json({ error: "Failed to check Firebase status" });
    }
  });

  app.post("/api/ratings/sync", async (_req, res) => {
    try {
      const result = await flushPendingRatingsToRtdb();
      const status = await checkFirebaseRtdbStatus();
      res.json({ ...result, status });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to sync to Firebase RTDB", message: err?.message || String(err) });
    }
  });

  // Hotel Management Rating Notification Routes (Google Apps Script -> Gmail)
  registerRatingNotificationRoutes(app);

  // Register decoupled storage & auth routes
  registerStorageRoutes(app);
  registerAuthRoutes(app);

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // Development mode uses Vite, production mode serves compiled static files
  if (process.env.NODE_ENV !== "production") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = config.port || 3000;

  server.listen(port, "0.0.0.0", () => {
    console.log(`[Server] running on http://0.0.0.0:${port}/ (ENV: ${config.nodeEnv})`);
  });
}

startServer().catch(console.error);
