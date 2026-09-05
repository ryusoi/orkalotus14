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
      const sectionName = rating.sectionName || rating.section || "Hotel Experience";
      const recommendation = rating.recommendation || "yes";
      const comment = (rating.comment || rating.feedback || rating.compliments || "").trim();
      const submittedAt = rating.createdAt || rating.submittedAt || nowIso;

      // Cleanly parse guest name and room number
      let guestName = (rating.guestName || "").trim();
      let roomNumber = (rating.roomNumber || "").trim();
      const rawDisplayName = (rating.guestDisplayName || "").trim();

      if (!guestName || guestName === "Verified Guest") {
        if (rawDisplayName) {
          const roomMatch =
            rawDisplayName.match(/(?:room|oda|rm|номер|no|nr|zimm?er)\s*[:#-]?\s*([a-zA-Z0-9-]+)/i) ||
            rawDisplayName.match(/\b([0-9]{3,4}[a-zA-Z]?)\b/);
          if (roomMatch) {
            if (!roomNumber || roomNumber === "Not provided" || roomNumber === "Not specified") {
              roomNumber = roomMatch[1];
            }
            const stripped = rawDisplayName
              .replace(/(?:room|oda|rm|номер|no|nr|zimm?er)\s*[:#-]?\s*[a-zA-Z0-9-]+/gi, "")
              .replace(new RegExp(`\\b${roomMatch[1]}\\b`, "g"), "")
              .replace(/^[\s\-–—,./|:]+|[\s\-–—,./|:]+$/g, "")
              .trim();
            if (stripped) {
              guestName = stripped;
            }
          } else {
            guestName = rawDisplayName;
          }
        }
      }

      if (!guestName) {
        guestName = rating.anonymous ? "Anonymous Guest" : "Verified Guest";
      }
      if (!roomNumber || roomNumber === "Not provided") {
        roomNumber = "Not specified";
      }

      // First stars for main rating
      const firstStars =
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
          }) + " (Marmaris, TR)"
        : nowIso;

      const subject = `[ORKA LOTUS] New Guest Ranking: ${targetName} • Overall ${overall.toFixed(1)}/5.0 ★`;

      // Secondary stars for detailed culinary & services dimensions
      const hasDetailed = Boolean(
        rating.hasDetailedRatings ||
        rating.detailedRatingsGiven ||
        (rating.hospitalityRating && rating.hospitalityRating !== overall) ||
        (rating.professionalismRating && rating.professionalismRating !== overall) ||
        (rating.helpfulnessRating && rating.helpfulnessRating !== overall) ||
        (rating.courtesyRating && rating.courtesyRating !== overall) ||
        (rating.qualityRating && rating.qualityRating !== overall)
      );

      const hospScore = Number(rating.hospitalityRating ?? rating.hospitality ?? overall);
      const profScore = Number(rating.professionalismRating ?? rating.professionalism ?? overall);
      const helpScore = Number(rating.helpfulnessRating ?? rating.helpfulness ?? overall);
      const courtScore = Number(rating.courtesyRating ?? rating.courtesy ?? overall);
      const qualScore = Number(rating.qualityRating ?? rating.quality ?? overall);

      const renderStarHelper = (score: number) => {
        const rounded = Math.min(5, Math.max(1, Math.round(score)));
        return "★".repeat(rounded) + "☆".repeat(Math.max(0, 5 - rounded));
      };

      const renderEmojiStars = (score: number) => {
        const rounded = Math.min(5, Math.max(1, Math.round(score)));
        return "⭐".repeat(rounded);
      };

      const hospStars = rating.hospitalityStars || renderStarHelper(hospScore);
      const profStars = rating.professionalismStars || renderStarHelper(profScore);
      const helpStars = rating.helpfulnessStars || renderStarHelper(helpScore);
      const courtStars = rating.courtesyStars || renderStarHelper(courtScore);
      const qualStars = rating.qualityStars || renderStarHelper(qualScore);

      const isCulinary =
        categoryName === "Food & Beverage" ||
        String(rating.category || "").includes("food") ||
        String(rating.targetId || "").includes("food") ||
        String(rating.targetId || "").includes("bar") ||
        String(rating.targetId || "").includes("chef") ||
        String(rating.targetId || "").includes("restaurant");

      const qualityDimensionLabel = isCulinary
        ? "Culinary & Service Quality"
        : "Service & Execution Quality";

      const detailedDimensions = rating.detailedDimensions || {
        overall: { label: "Overall Experience", score: overall, stars: firstStars },
        hospitality: { label: "Hospitality & Warmth", score: hospScore, stars: hospStars },
        professionalism: { label: "Professionalism & Competence", score: profScore, stars: profStars },
        helpfulness: { label: "Helpfulness & Speed", score: helpScore, stars: helpStars },
        courtesy: { label: "Courtesy & Respect", score: courtScore, stars: courtStars },
        quality: { label: qualityDimensionLabel, score: qualScore, stars: qualStars },
      };

      const secondaryStarsSummary = hasDetailed
        ? `Overall: ${firstStars} (${overall.toFixed(1)}/5.0) • Hospitality: ${hospStars} (${hospScore.toFixed(1)}/5.0) • Professionalism: ${profStars} (${profScore.toFixed(1)}/5.0) • Helpfulness: ${helpStars} (${helpScore.toFixed(1)}/5.0) • Courtesy: ${courtStars} (${courtScore.toFixed(1)}/5.0) • ${qualityDimensionLabel}: ${qualStars} (${qualScore.toFixed(1)}/5.0)`
        : `Overall: ${firstStars} (${overall.toFixed(1)}/5.0) • Hospitality: ${hospStars} • Professionalism: ${profStars} • Helpfulness: ${helpStars} • Courtesy: ${courtStars} • ${qualityDimensionLabel}: ${qualStars}`;

      const detailedDimensionsBlock = [
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "⭐ DETAILED EXPERIENCE & SERVICE DIMENSIONS ⭐",
        hasDetailed
          ? "(✓ Rated individually with secondary stars by guest)"
          : "(• Service & experience criteria evaluated with main rating)",
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        `⭐ Overall Experience: ${renderEmojiStars(overall)} (${overall.toFixed(1)} / 5.0)`,
        `⭐ Hospitality & Warmth: ${renderEmojiStars(hospScore)} (${hospScore.toFixed(1)} / 5.0)`,
        `⭐ Professionalism & Competence: ${renderEmojiStars(profScore)} (${profScore.toFixed(1)} / 5.0)`,
        `⭐ Helpfulness & Speed: ${renderEmojiStars(helpScore)} (${helpScore.toFixed(1)} / 5.0)`,
        `⭐ Courtesy & Respect: ${renderEmojiStars(courtScore)} (${courtScore.toFixed(1)} / 5.0)`,
        `⭐ ${qualityDimensionLabel}: ${renderEmojiStars(qualScore)} (${qualScore.toFixed(1)} / 5.0)`,
      ].join("\n");

      const rawUserComment = String(
        rating.rawComment ||
        rating.userComment ||
        rating.comment ||
        rating.feedback ||
        rating.compliments ||
        ""
      ).trim();

      const cleanRawUserComment = rawUserComment.includes("⭐ DETAILED EXPERIENCE & SERVICE DIMENSIONS ⭐")
        ? rawUserComment.split("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")[0].trim()
        : rawUserComment;

      const formattedCommentForAppsScript = cleanRawUserComment && cleanRawUserComment !== "No written feedback provided."
        ? `${cleanRawUserComment}\n\n${detailedDimensionsBlock}`
        : detailedDimensionsBlock;

      const getRecLabel = (rec?: string) => {
        switch (rec) {
          case "absolutely":
            return "✓ Absolutely Recommended (100% Enthusiastic)";
          case "yes":
            return "✓ Yes, Recommended";
          case "maybe":
            return "• Neutral / Maybe";
          case "probably_not":
            return "✗ Could Be Better / Needs Attention";
          default:
            return rec || "Not specified";
        }
      };

      const rtdbConsoleUrl = `https://console.firebase.google.com/project/orka-lotus-beach-marinaryu/database/orka-lotus-beach-marinaryu-default-rtdb/data/ratings/${ratingId}`;

      // Build Luxury HTML Email
      const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ORKA LOTUS — NEW GUEST RANKING</title>
</head>
<body style="margin: 0; padding: 0; background-color: #040e17; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #040e17; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Container Card -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 640px; background-color: #081523; border: 2px solid #996515; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.75);">
          
          <!-- Golden Shimmer Ribbon -->
          <tr>
            <td style="height: 6px; background: linear-gradient(90deg, #996515, #fef08a, #e5c158, #996515);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 26px 24px 20px 24px; text-align: center; background: linear-gradient(180deg, #0f2438 0%, #081523 100%); border-bottom: 1px solid #1c354d;">
              <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 800; letter-spacing: 2.5px; text-transform: uppercase; color: #d4af37;">
                ORKA LOTUS BEACH HOTEL • MARMARIS
              </p>
              <h1 style="margin: 0; font-size: 22px; font-weight: 900; letter-spacing: 0.5px; color: #ffffff; text-transform: uppercase;">
                ORKA LOTUS — NEW GUEST RANKING
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 12px; font-weight: 500; color: #94a3b8;">
                Executive Quality Assurance & Guest Experience Directorate
              </p>
            </td>
          </tr>

          <!-- SECTION 1: PRIMARY MAIN RATING (FIRST STARS) -->
          <tr>
            <td style="padding: 24px; text-align: center; background: radial-gradient(circle at center, #132a42 0%, #081523 75%); border-bottom: 1px solid #142a3f;">
              <div style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #11293e, #0b1c2b); border: 2px solid #d4af37; border-radius: 14px; box-shadow: 0 4px 20px rgba(212,175,55,0.25);">
                <p style="margin: 0 0 4px 0; font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #fef08a;">
                  PRIMARY OVERALL GUEST RATING
                </p>
                <div style="font-size: 42px; font-weight: 900; line-height: 1; color: #ffffff; font-family: Georgia, serif; text-shadow: 0 2px 8px rgba(0,0,0,0.5);">
                  ${overall.toFixed(1)} <span style="font-size: 20px; color: #d4af37; font-weight: 700;">/ 5.0</span>
                </div>
                <!-- First Stars Shown For Main Rating -->
                <div style="margin-top: 8px; font-size: 26px; color: #fbbf24; letter-spacing: 4px; text-shadow: 0 0 10px rgba(251,191,36,0.6);">
                  ${firstStars}
                </div>
              </div>
              <p style="margin: 16px 0 0 0; font-size: 19px; font-weight: 800; color: #ffffff;">
                ${targetName}
              </p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #cbd5e1;">
                ${sectionName} • ${categoryName}
              </p>
            </td>
          </tr>

          <!-- SECTION 2: GUEST & SUBMISSION DETAILS -->
          <tr>
            <td style="padding: 20px 24px 16px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0b1a29; border: 1px solid #1c354d; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td colspan="2" style="padding: 12px 16px; background-color: #10263c; border-bottom: 1px solid #1c354d; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #fef08a;">
                    GUEST & SUBMISSION DETAILS
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 12px; color: #94a3b8; width: 38%; border-bottom: 1px solid #142a3f;">Guest Name:</td>
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 700; color: #ffffff; border-bottom: 1px solid #142a3f;">${guestName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 12px; color: #94a3b8; border-bottom: 1px solid #142a3f;">Room Number:</td>
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 700; color: #ffffff; border-bottom: 1px solid #142a3f;">${roomNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 12px; color: #94a3b8; border-bottom: 1px solid #142a3f;">Recommendation:</td>
                  <td style="padding: 10px 16px; font-size: 12px; font-weight: 700; color: #34d399; border-bottom: 1px solid #142a3f;">${getRecLabel(recommendation)}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 12px; color: #94a3b8; border-bottom: 1px solid #142a3f;">Submission Date & Time:</td>
                  <td style="padding: 10px 16px; font-size: 12px; font-weight: 600; color: #ffffff; border-bottom: 1px solid #142a3f;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 12px; color: #94a3b8;">Rating ID:</td>
                  <td style="padding: 10px 16px; font-size: 11px; font-family: monospace; color: #d4af37;">${ratingId}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SECTION 3: DETAILED CULINARY & SERVICES STAR RANKING (SECONDARY STARS) -->
          <tr>
            <td style="padding: 0 24px 20px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0b1a29; border: 1px solid ${hasDetailed ? "#d4af37" : "#1c354d"}; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td colspan="3" style="padding: 12px 16px; background-color: #10263c; border-bottom: 1px solid #1c354d;">
                    <div style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #fef08a;">
                      DETAILED CULINARY & SERVICES STAR RANKING (SECONDARY STARS)
                    </div>
                    <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">
                      ${hasDetailed ? "✓ In-depth optional criteria rated by guest with secondary stars" : "• Service & experience criteria rated in harmony with main rating"}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 12px; color: #cbd5e1; border-bottom: 1px solid #142a3f;">Overall Experience</td>
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 700; color: #ffffff; text-align: right; border-bottom: 1px solid #142a3f;">${overall.toFixed(1)} / 5.0</td>
                  <td style="padding: 10px 16px; font-size: 13px; color: #fbbf24; text-align: right; width: 100px; border-bottom: 1px solid #142a3f; letter-spacing: 1px;">${firstStars}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 12px; color: #cbd5e1; border-bottom: 1px solid #142a3f;">Hospitality & Warmth</td>
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 700; color: #ffffff; text-align: right; border-bottom: 1px solid #142a3f;">${hospScore.toFixed(1)} / 5.0</td>
                  <td style="padding: 10px 16px; font-size: 13px; color: #fbbf24; text-align: right; width: 100px; border-bottom: 1px solid #142a3f; letter-spacing: 1px;">${hospStars}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 12px; color: #cbd5e1; border-bottom: 1px solid #142a3f;">Professionalism & Competence</td>
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 700; color: #ffffff; text-align: right; border-bottom: 1px solid #142a3f;">${profScore.toFixed(1)} / 5.0</td>
                  <td style="padding: 10px 16px; font-size: 13px; color: #fbbf24; text-align: right; border-bottom: 1px solid #142a3f; letter-spacing: 1px;">${profStars}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 12px; color: #cbd5e1; border-bottom: 1px solid #142a3f;">Helpfulness & Speed</td>
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 700; color: #ffffff; text-align: right; border-bottom: 1px solid #142a3f;">${helpScore.toFixed(1)} / 5.0</td>
                  <td style="padding: 10px 16px; font-size: 13px; color: #fbbf24; text-align: right; border-bottom: 1px solid #142a3f; letter-spacing: 1px;">${helpStars}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 12px; color: #cbd5e1; border-bottom: 1px solid #142a3f;">Courtesy & Respect</td>
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 700; color: #ffffff; text-align: right; border-bottom: 1px solid #142a3f;">${courtScore.toFixed(1)} / 5.0</td>
                  <td style="padding: 10px 16px; font-size: 13px; color: #fbbf24; text-align: right; border-bottom: 1px solid #142a3f; letter-spacing: 1px;">${courtStars}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 16px; font-size: 12px; color: #cbd5e1;">${qualityDimensionLabel}</td>
                  <td style="padding: 10px 16px; font-size: 13px; font-weight: 700; color: #ffffff; text-align: right;">${qualScore.toFixed(1)} / 5.0</td>
                  <td style="padding: 10px 16px; font-size: 13px; color: #fbbf24; text-align: right; letter-spacing: 1px;">${qualStars}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SECTION 4: GUEST FEEDBACK & COMPLIMENTS -->
          <tr>
            <td style="padding: 0 24px 20px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0b1a29; border: 1px solid #d4af37; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 12px 16px; background-color: #10263c; border-bottom: 1px solid #1c354d; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #fef08a;">
                    GUEST FEEDBACK & COMPLIMENTS
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px; font-size: 13px; line-height: 1.6; color: ${comment ? "#ffffff" : "#94a3b8"}; font-style: ${comment ? "normal" : "italic"};">
                    ${comment ? `“${comment}”` : "No written comment or feedback was provided with this submission."}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SECTION 5: ACTION BUTTON -->
          <tr>
            <td style="padding: 0 24px 24px 24px; text-align: center;">
              <a href="${rtdbConsoleUrl}" target="_blank" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #d4af37, #fef08a, #d4af37); color: #040e17; text-decoration: none; font-size: 12px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; border-radius: 10px; box-shadow: 0 4px 14px rgba(212,175,55,0.4);">
                VIEW IN FIREBASE REALTIME DATABASE →
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding: 18px 24px; background-color: #06111d; border-top: 1px solid #142a3f; text-align: center; font-size: 11px; color: #64748b; line-height: 1.5;">
              <p style="margin: 0;">
                Orka Lotus Beach Hotel Quality Assurance System • Automated Executive Notification
              </p>
              <p style="margin: 4px 0 0 0; font-size: 10px; color: #475569;">
                Marmaris / Icmeler, Turkey • Database Instance: orka-lotus-beach-marinaryu-default-rtdb
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim();

      // Plain text fallback
      const textBody = `
ORKA LOTUS BEACH HOTEL — NEW GUEST RANKING
=====================================================

1. PRIMARY GUEST RATING (FIRST STARS)
-----------------------------------------------------
Target: ${targetName}
Category: ${categoryName} (${sectionName})
Score: ${overall.toFixed(1)} / 5.0
First Stars: ${firstStars}

2. DETAILED CULINARY & SERVICES STAR RANKING (SECONDARY STARS)
-----------------------------------------------------
${secondaryStarsSummary}
- Overall Experience: ${overall.toFixed(1)}/5.0 ${firstStars}
- Hospitality & Warmth: ${hospScore.toFixed(1)}/5.0 ${hospStars}
- Professionalism & Competence: ${profScore.toFixed(1)}/5.0 ${profStars}
- Helpfulness & Speed: ${helpScore.toFixed(1)}/5.0 ${helpStars}
- Courtesy & Respect: ${courtScore.toFixed(1)}/5.0 ${courtStars}
- ${qualityDimensionLabel}: ${qualScore.toFixed(1)}/5.0 ${qualStars}

3. GUEST & SUBMISSION DETAILS
-----------------------------------------------------
Guest Name: ${guestName}
Room Number: ${roomNumber}
Recommendation: ${getRecLabel(recommendation)}
Submission Time: ${formattedDate}
Rating ID: ${ratingId}

4. GUEST FEEDBACK & COMPLIMENTS
-----------------------------------------------------
${cleanRawUserComment ? `"${cleanRawUserComment}"` : "No written feedback was provided."}

=====================================================
Firebase Console: ${rtdbConsoleUrl}
Orka Lotus Beach Hotel Quality Assurance Directorate
      `.trim();

      // Comprehensive payload matching exact working Google Apps Script expectations
      // Comma-separated recipients sent as single server-side string:
      // "marmarisluxuryvillas@gmail.com,orkahomespro@gmail.com"
      const payload = {
        // Core fields expected by Google Apps Script
        category: categoryName,
        targetName,
        rating: overall,
        recommendation,
        comment: formattedCommentForAppsScript,
        feedback: formattedCommentForAppsScript,
        compliments: formattedCommentForAppsScript,
        rawComment: cleanRawUserComment || "No written feedback provided.",
        userComment: cleanRawUserComment || "No written feedback provided.",
        guestName,
        roomNumber,
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

        // Primary rating with first stars
        overallRating: overall,
        overallExperience: overall,
        stars: firstStars,
        firstStars,

        // Detailed culinary & services star ranking (secondary stars)
        hasDetailedRatings: true,
        detailedRatingsGiven: hasDetailed,
        secondaryStars: secondaryStarsSummary,
        secondaryStarsSummary,
        detailedDimensions,
        detailedDimensionsBlock,

        // Rich HTML and plain text emails
        htmlBody,
        html: htmlBody,
        body: textBody,
        text: textBody,
        message: textBody,

        // Individual dimensions
        overallExperienceRating: overall,
        overallExperienceStars: renderEmojiStars(overall),
        hospitality: hospScore,
        hospitalityRating: hospScore,
        hospitalityStars: hospStars,
        hospitalityEmojiStars: renderEmojiStars(hospScore),
        professionalism: profScore,
        professionalismRating: profScore,
        professionalismStars: profStars,
        professionalismEmojiStars: renderEmojiStars(profScore),
        helpfulness: helpScore,
        helpfulnessRating: helpScore,
        helpfulnessStars: helpStars,
        helpfulnessEmojiStars: renderEmojiStars(helpScore),
        courtesy: courtScore,
        courtesyRating: courtScore,
        courtesyStars: courtStars,
        courtesyEmojiStars: renderEmojiStars(courtScore),
        quality: qualScore,
        qualityRating: qualScore,
        qualityStars: qualStars,
        qualityEmojiStars: renderEmojiStars(qualScore),

        anonymous: Boolean(rating.anonymous),
        sectionName,
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
