/**
 * Hotel Management Rating Notification Service for ORKA LOTUS BEACH HOTEL
 *
 * Architecture:
 * Guest submits rating
 *   ↓
 * Firestore successfully saves rating
 *   ↓
 * Vercel / Express server notification endpoint (/api/ratings/notify)
 *   ↓
 * Google Apps Script Web App (GOOGLE_APPS_SCRIPT_URL)
 *   ↓
 * Gmail sends ONE notification email with comma-separated recipients
 *   ↓
 * marmarisluxuryvillas@gmail.com AND orkahomespro@gmail.com
 *
 * Duplicate-notification protection:
 * Guarantees that only ONE notification request is ever sent to Google Apps Script per rating ID.
 * Tracks status in emailNotifications/{ratingId} with statuses: pending | sent | failed.
 */

import type express from "express";

export const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw-sOSURWw8XHPaYYOXpHwilN0AIRLYoj2O5lszdAWB_whu6Aik2ngPNhDmR9iM0DawVw/exec";

export const RATING_NOTIFICATION_EMAIL =
  "marmarisluxuryvillas@gmail.com,orkahomespro@gmail.com";

export const DEFAULT_NOTIFICATION_RECIPIENTS = RATING_NOTIFICATION_EMAIL;
export const DEFAULT_APPS_SCRIPT_URL = GOOGLE_APPS_SCRIPT_URL;

const RTDB_URL =
  "https://orka-lotus-beach-marinaryu-default-rtdb.europe-west1.firebasedatabase.app";

/**
 * Retrieves the server-side rating notification email list.
 * Hardcoded to marmarisluxuryvillas@gmail.com,orkahomespro@gmail.com.
 * Server-side ONLY - never exposed to the client browser.
 */
export function getRatingNotificationEmail(): string {
  const envEmail = process.env.RATING_NOTIFICATION_EMAIL;
  if (envEmail && envEmail.trim()) {
    return envEmail.trim();
  }
  return RATING_NOTIFICATION_EMAIL;
}

/**
 * Retrieves the server-side Google Apps Script Web App endpoint URL.
 * Hardcoded to verified hotel management endpoint so Vercel deployments work without manual config.
 */
export function getGoogleAppsScriptUrl(): string {
  const envUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (envUrl && envUrl.trim()) {
    return envUrl.trim();
  }
  return GOOGLE_APPS_SCRIPT_URL;
}

export interface EmailNotificationRecord {
  ratingId: string;
  status: "pending" | "sent" | "failed";
  recipient: string;
  createdAt: string;
  sentAt?: string;
  errorMessage?: string;
}

// In-memory status store for rapid deduplication
const emailNotificationsStore = new Map<string, EmailNotificationRecord>();

// In-flight dispatches map to avoid concurrent duplicate requests
const inFlightDispatches = new Map<string, Promise<NotificationResult>>();

export interface NotificationResult {
  success: boolean;
  notified: boolean;
  recipients: string;
  appsScriptConfigured: boolean;
  message: string;
  ratingId: string;
  status?: "pending" | "sent" | "failed";
}

/**
 * Checks whether a notification has already been successfully sent for a rating ID.
 */
export function isRatingAlreadyNotified(ratingId: string): boolean {
  const record = emailNotificationsStore.get(ratingId);
  return record?.status === "sent";
}

/**
 * Returns the count of sent notifications.
 */
export function getNotifiedRatingCount(): number {
  let count = 0;
  emailNotificationsStore.forEach((record) => {
    if (record.status === "sent") count++;
  });
  return count;
}

/**
 * Persists notification record to Firebase RTDB asynchronously.
 */
async function persistNotificationRecord(record: EmailNotificationRecord): Promise<void> {
  try {
    const url = `${RTDB_URL}/emailNotifications/${record.ratingId}.json`;
    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(3000),
    });
  } catch {
    // Non-blocking persistence
  }
}

/**
 * Dispatches a single notification request to Google Apps Script.
 * Preserves duplicate-notification protection based on the rating ID.
 */
export async function dispatchRatingNotification(ratingInput: any): Promise<NotificationResult> {
  const rating = ratingInput?.rating || ratingInput;
  const ratingId = String(rating?.id || rating?.ratingId || ratingInput?.ratingId || "").trim();
  const recipients = getRatingNotificationEmail();
  const scriptUrl = getGoogleAppsScriptUrl();

  console.log("[RATING_NOTIFICATION] request received");

  if (!ratingId) {
    console.warn("[RATING_NOTIFICATION] Missing rating ID in notification payload");
    return {
      success: false,
      notified: false,
      recipients,
      appsScriptConfigured: Boolean(scriptUrl),
      message: "Missing or invalid rating ID in notification payload",
      ratingId: "unknown",
      status: "failed",
    };
  }

  console.log(`[RATING_NOTIFICATION] rating ID: ${ratingId}`);
  console.log(`[RATING_NOTIFICATION] Apps Script URL configured: ${Boolean(scriptUrl)}`);

  // 1. DUPLICATE PROTECTION: Check if already sent locally
  const existing = emailNotificationsStore.get(ratingId);
  if (existing?.status === "sent") {
    console.log(`[RATING_NOTIFICATION] notification already sent for rating ID: ${ratingId}. Suppressing duplicate.`);
    return {
      success: true,
      notified: false,
      recipients,
      appsScriptConfigured: Boolean(scriptUrl),
      message: `Duplicate notification ignored. Rating ${ratingId} was already sent.`,
      ratingId,
      status: "sent",
    };
  }

  // 1b. DUPLICATE PROTECTION: Check distributed RTDB store for cross-instance / serverless deduplication
  if (!existing && RTDB_URL) {
    try {
      const rtdbCheckUrl = `${RTDB_URL}/emailNotifications/${encodeURIComponent(ratingId)}.json`;
      const rtdbRes = await fetch(rtdbCheckUrl, { signal: AbortSignal.timeout(1200) });
      if (rtdbRes.ok) {
        const stored = await rtdbRes.json();
        if (stored && (stored.status === "sent" || stored.status === "pending")) {
          emailNotificationsStore.set(ratingId, stored);
          console.log(`[RATING_NOTIFICATION] RTDB confirmed rating ID ${ratingId} already notified (status: ${stored.status}). Suppressing duplicate.`);
          return {
            success: true,
            notified: false,
            recipients,
            appsScriptConfigured: Boolean(scriptUrl),
            message: `Duplicate notification blocked. Rating ${ratingId} was already sent.`,
            ratingId,
            status: "sent",
          };
        }
      }
    } catch {
      // Non-blocking RTDB check
    }
  }

  // 2. CONCURRENT DEDUPLICATION: If dispatch is in-flight, return the existing promise
  if (inFlightDispatches.has(ratingId)) {
    return inFlightDispatches.get(ratingId)!;
  }

  // Mark as pending in memory and RTDB
  const nowIso = new Date().toISOString();
  const notificationRecord: EmailNotificationRecord = {
    ratingId,
    status: "pending",
    recipient: recipients,
    createdAt: nowIso,
  };
  emailNotificationsStore.set(ratingId, notificationRecord);
  persistNotificationRecord(notificationRecord).catch(() => null);

  const dispatchPromise = (async (): Promise<NotificationResult> => {
    // If Google Apps Script endpoint is not set in the environment, log safely
    if (!scriptUrl) {
      console.warn("[Rating Notification Notice] GOOGLE_APPS_SCRIPT_URL is not configured in server environment.");
      notificationRecord.status = "failed";
      notificationRecord.errorMessage = "GOOGLE_APPS_SCRIPT_URL is not configured";
      persistNotificationRecord(notificationRecord).catch(() => null);
      return {
        success: true,
        notified: false,
        recipients,
        appsScriptConfigured: false,
        message: "GOOGLE_APPS_SCRIPT_URL not configured. Rating recorded.",
        ratingId,
        status: "failed",
      };
    }

    try {
      const overall = Number(rating.overallRating || rating.rating) || 5.0;
      const targetName = rating.targetName || rating.targetId || "Hotel Experience";
      const categoryName = rating.categoryName || rating.category || "General Service";
      const guestName =
        rating.guestName ||
        (rating.guestDisplayName && !rating.anonymous
          ? rating.guestDisplayName
          : rating.anonymous
          ? "Anonymous Guest"
          : "Verified Guest");
      const roomNumber = rating.roomNumber || "Not provided";
      const recommendation = rating.recommendation || "yes";
      const comment = rating.comment || "";
      const submittedAt = rating.createdAt || rating.submittedAt || nowIso;

      const stars =
        "★".repeat(Math.min(5, Math.max(1, Math.round(overall)))) +
        "☆".repeat(Math.max(0, 5 - Math.min(5, Math.max(1, Math.round(overall)))));

      const formattedDate = rating.createdAt
        ? new Date(rating.createdAt).toLocaleString("en-GB", {
            timeZone: "Europe/Istanbul",
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }) + " (Marmaris)"
        : nowIso;

      const subject = `[ORKA LOTUS] New Guest Ranking: ${targetName} • Overall ${overall.toFixed(1)}/5.0 ★`;

      // Comprehensive payload matching exact working Google Apps Script expectations
      // Comma-separated recipients sent as single server-side string:
      // "marmarisluxuryvillas@gmail.com,orkahomespro@gmail.com"
      const payload = {
        // Core fields expected by Google Apps Script
        category: categoryName,
        targetName,
        rating: overall,
        recommendation,
        comment,
        guestName,
        ratingId,
        submittedAt,

        // Recipient routing
        recipient: recipients,
        recipients,
        email: recipients,
        to: recipients,

        // Hotel & context
        hotelName: "ORKA LOTUS BEACH HOTEL",
        location: "Marmaris / Icmeler, Turkey",
        subject,

        // Detailed dimensions
        overallRating: overall,
        overallExperience: overall,
        stars,
        hospitality: rating.hospitalityRating ?? rating.hospitality ?? overall,
        hospitalityRating: rating.hospitalityRating ?? overall,
        professionalism: rating.professionalismRating ?? rating.professionalism ?? overall,
        professionalismRating: rating.professionalismRating ?? overall,
        helpfulness: rating.helpfulnessRating ?? rating.helpfulness ?? overall,
        helpfulnessRating: rating.helpfulnessRating ?? overall,
        courtesy: rating.courtesyRating ?? rating.courtesy ?? overall,
        courtesyRating: rating.courtesyRating ?? overall,
        quality: rating.qualityRating ?? rating.quality ?? overall,
        qualityRating: rating.qualityRating ?? overall,
        roomNumber,
        anonymous: Boolean(rating.anonymous),
        sectionName: rating.sectionName || "Hotel Experience",
        categoryName,

        // Metadata
        formattedDate,
        createdAt: submittedAt,

        // Full record
        ratingRecord: rating,
      };

      console.log("[RATING_NOTIFICATION] POST started");

      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
        redirect: "follow",
        signal: AbortSignal.timeout(10000),
      });

      console.log(`[RATING_NOTIFICATION] Apps Script response status: ${response.status}`);

      let isSuccess = response.ok;
      try {
        const text = await response.text();
        const json = JSON.parse(text);
        if (json && json.success === false) {
          isSuccess = false;
        }
      } catch {
        // If text cannot be parsed as JSON, rely on HTTP status code (200-299)
      }

      if (isSuccess) {
        notificationRecord.status = "sent";
        notificationRecord.sentAt = new Date().toISOString();
        emailNotificationsStore.set(ratingId, notificationRecord);
        persistNotificationRecord(notificationRecord).catch(() => null);

        console.log("[RATING_NOTIFICATION] notification sent successfully");

        return {
          success: true,
          notified: true,
          recipients,
          appsScriptConfigured: true,
          message: "Notification successfully dispatched to Google Apps Script.",
          ratingId,
          status: "sent",
        };
      } else {
        notificationRecord.status = "failed";
        notificationRecord.errorMessage = `Apps Script responded with status ${response.status}`;
        emailNotificationsStore.set(ratingId, notificationRecord);
        persistNotificationRecord(notificationRecord).catch(() => null);

        console.error("[RATING_NOTIFICATION] notification failed");

        return {
          success: false,
          notified: false,
          recipients,
          appsScriptConfigured: true,
          message: `Google Apps Script returned status ${response.status}`,
          ratingId,
          status: "failed",
        };
      }
    } catch (err: any) {
      notificationRecord.status = "failed";
      notificationRecord.errorMessage = err?.message || String(err);
      emailNotificationsStore.set(ratingId, notificationRecord);
      persistNotificationRecord(notificationRecord).catch(() => null);

      console.error("[RATING_NOTIFICATION] notification failed");
      return {
        success: false,
        notified: false,
        recipients,
        appsScriptConfigured: true,
        message: `Google Apps Script request error: ${err?.message || String(err)}`,
        ratingId,
        status: "failed",
      };
    } finally {
      inFlightDispatches.delete(ratingId);
    }
  })();

  inFlightDispatches.set(ratingId, dispatchPromise);
  return dispatchPromise;
}

/**
 * Registers the server-side rating notification endpoints.
 * Compatible with Express and Vercel serverless functions.
 */
export function registerRatingNotificationRoutes(app: express.Express): void {
  // Universal handler for /api/rating-notification, /api/ratings/notify and /api/notify-rating
  const notifyHandler = async (req: express.Request, res: express.Response) => {
    try {
      const payload = req.body || {};
      const rating = payload.rating || payload;
      if (!rating || (!rating.id && !rating.ratingId && !rating.targetId)) {
        return res.status(400).json({
          success: false,
          error: "Invalid rating payload for notification. Must include rating data.",
        });
      }

      const result = await dispatchRatingNotification(payload);
      const statusCode = result.success ? 200 : 502;
      return res.status(statusCode).json(result);
    } catch (err: any) {
      console.error("[RATING_NOTIFICATION] notification failed:", err?.message || String(err));
      return res.status(500).json({
        success: false,
        error: "Failed to process rating notification",
        message: err?.message || String(err),
      });
    }
  };

  const statusHandler = (_req: express.Request, res: express.Response) => {
    res.json({
      service: "ORKA LOTUS BEACH HOTEL rating notification service",
      status: "online",
      appsScriptConfigured: Boolean(getGoogleAppsScriptUrl()),
      recipients: getRatingNotificationEmail(),
      notifiedCount: getNotifiedRatingCount(),
      duplicateProtectionActive: true,
    });
  };

  // Register routes with and without /api prefix to guarantee matching under any proxy or rewrite
  const notificationRoutes = [
    "/api/rating-notification",
    "/rating-notification",
    "/api/ratings/notify",
    "/ratings/notify",
    "/api/notify-rating",
    "/notify-rating",
  ];

  notificationRoutes.forEach((route) => {
    app.post(route, notifyHandler);
    app.get(route, statusHandler);
  });

  // Diagnostic endpoint to verify server-side configuration without exposing secrets
  app.get("/api/ratings/notification-status", statusHandler);
  app.get("/ratings/notification-status", statusHandler);
}
