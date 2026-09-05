/**
 * Server-side Vercel Serverless Function for ORKA LOTUS BEACH HOTEL
 * Endpoint: /api/rating-notification
 *
 * Sequence:
 * Guest completes rating -> Firestore saves -> Vercel Serverless API -> Google Apps Script -> Gmail
 */

import {
  dispatchRatingNotification,
  getGoogleAppsScriptUrl,
  getRatingNotificationEmail,
} from "../server/services/ratingNotificationService";

async function parseBody(req: any): Promise<any> {
  if (req.body) {
    if (Buffer.isBuffer(req.body)) {
      try {
        return JSON.parse(req.body.toString("utf-8"));
      } catch {
        return {};
      }
    }
    if (typeof req.body === "object" && req.body !== null) return req.body;
    if (typeof req.body === "string") {
      try {
        return JSON.parse(req.body);
      } catch {
        return {};
      }
    }
  }

  if (req.readableEnded || req._body) {
    return {};
  }

  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (chunk: any) => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on("error", () => resolve({}));
    // Timeout guard to prevent hanging if stream never ends
    setTimeout(() => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    }, 2000);
  });
}

function sendJson(res: any, status: number, data: any) {
  try {
    if (typeof res.setHeader === "function") {
      res.setHeader("Content-Type", "application/json");
    }
  } catch {}

  if (typeof res.status === "function") {
    const s = res.status(status);
    if (s && typeof s.json === "function") {
      return s.json(data);
    }
    if (s && typeof s.send === "function") {
      return s.send(JSON.stringify(data));
    }
  }

  if (typeof res.json === "function") {
    if (typeof res.statusCode !== "undefined") {
      res.statusCode = status;
    }
    return res.json(data);
  }

  if (typeof res.writeHead === "function") {
    res.writeHead(status, { "Content-Type": "application/json" });
  } else {
    res.statusCode = status;
  }
  return res.end(JSON.stringify(data));
}

export default async function handler(req: any, res: any) {
  // CORS & Security headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return sendJson(res, 200, { status: "ok" });
  }

  if (req.method === "GET") {
    return sendJson(res, 200, {
      service: "ORKA LOTUS BEACH HOTEL Rating Notification API",
      status: "ready",
      endpoint: "/api/rating-notification",
      appsScriptConfigured: Boolean(getGoogleAppsScriptUrl()),
      recipients: getRatingNotificationEmail(),
    });
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, { success: false, error: "Method Not Allowed. Use POST." });
  }

  try {
    const payload = await parseBody(req);
    const rating = payload?.rating || payload;

    if (!rating || (!rating.id && !rating.ratingId && !rating.targetId)) {
      console.warn("[RATING_NOTIFICATION] Invalid payload received: missing rating data");
      return sendJson(res, 400, {
        success: false,
        error: "Invalid rating payload. Missing rating data or target ID.",
      });
    }

    const result = await dispatchRatingNotification(payload);
    const statusCode = result.success ? 200 : 502;
    return sendJson(res, statusCode, result);
  } catch (error: any) {
    console.error("[RATING_NOTIFICATION] notification failed:", error?.message || String(error));
    return sendJson(res, 500, {
      success: false,
      error: "Internal Server Error in rating notification dispatch",
      message: error?.message || String(error),
    });
  }
}
