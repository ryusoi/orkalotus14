import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerAuthRoutes } from "../server/services/auth";
import { registerStorageRoutes } from "../server/services/storage";
import { registerRatingNotificationRoutes, dispatchRatingNotification } from "../server/services/ratingNotificationService";
import {
  saveRatingToFirebaseRtdb,
  checkFirebaseRtdbStatus,
  getSavedRatingsAndSummaries,
  flushPendingRatingsToRtdb,
} from "../server/services/firebaseRtdbService";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";

const app = express();

// Global CORS headers for cross-environment compatibility (Vercel & Preview)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get(["/api/health", "/health"], (_req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

// Hotel Management Rating Notification Routes (Google Apps Script -> Gmail)
registerRatingNotificationRoutes(app);

// Direct fallback middleware to catch notification requests even under Vercel URL rewrite normalization
app.use((req, res, next) => {
  const url = req.url || "";
  const matchedPath = String(req.headers["x-matched-path"] || "");
  const originalUri = String(req.headers["x-forwarded-uri"] || "");
  const isNotify =
    url.includes("rating-notification") ||
    url.includes("/ratings/notify") ||
    url.includes("notify-rating") ||
    matchedPath.includes("rating-notification") ||
    matchedPath.includes("/ratings/notify") ||
    matchedPath.includes("notify-rating") ||
    originalUri.includes("rating-notification") ||
    originalUri.includes("/ratings/notify") ||
    originalUri.includes("notify-rating");

  if (req.method === "POST" && isNotify) {
    dispatchRatingNotification(req.body)
      .then((result: any) => res.status(result.success ? 200 : 502).json(result))
      .catch((err: any) =>
        res.status(500).json({ success: false, error: err?.message || String(err) })
      );
    return;
  }
  next();
});

// Ratings endpoints for Vercel deployment
app.post("/api/ratings", async (req, res) => {
  try {
    const { rating, summary } = req.body;
    if (!rating || !rating.targetId || typeof rating.overallRating !== "number") {
      return res.status(400).json({ error: "Invalid rating submission payload" });
    }
    const result = await saveRatingToFirebaseRtdb(rating, summary);
    res.json(result);
  } catch (err: any) {
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
  } catch {
    res.status(500).json({ error: "Failed to fetch ratings" });
  }
});

app.get("/api/ratings/status", async (_req, res) => {
  try {
    const status = await checkFirebaseRtdbStatus();
    res.json(status);
  } catch {
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

registerStorageRoutes(app);
registerAuthRoutes(app);

app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export default app;
