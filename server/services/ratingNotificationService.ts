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

      // Cleanly parse guest name, room number, and exact raw text from the "Your Name or Room Number" input box
      const rawGuestInput = String(
        rating.rawGuestInput ||
        rating.nameOrRoomNumber ||
        rating.guestNameOrRoom ||
        rating.guestDisplayName ||
        ""
      ).trim();

      let guestName = String(rating.guestName || "").trim();
      let roomNumber = String(rating.roomNumber || "").trim();

      // Clean existing roomNumber
      if (roomNumber && roomNumber !== "Not specified" && roomNumber !== "Not provided") {
        roomNumber = roomNumber.replace(/^(?:room|oda|rm|номер|no|nr|zimm?er)\s*[:#-]?\s*/i, "").trim();
      } else {
        roomNumber = "";
      }

      // Check if room number is contained in rawGuestInput, guestName, or rating.room
      const textToSearch = [rawGuestInput, guestName, rating.room || ""].filter(Boolean).join(" ");
      if (!roomNumber && textToSearch) {
        const keywordMatch = textToSearch.match(/(?:room|oda|rm|номер|no|nr|zimm?er)\s*[:#-]?\s*([a-zA-Z0-9-]+)/i);
        const numberMatch = textToSearch.match(/\b([0-9]{1,5}[a-zA-Z]?|[a-zA-Z][0-9]{1,4})\b/);
        const match = keywordMatch || numberMatch;
        if (match) {
          roomNumber = match[1].trim();
        }
      }

      // If guestName was set to room number or missing, extract real guest name
      if (rawGuestInput) {
        if (roomNumber) {
          const stripped = rawGuestInput
            .replace(/(?:room|oda|rm|номер|no|nr|zimm?er)\s*[:#-]?\s*[a-zA-Z0-9-]+/gi, "")
            .replace(new RegExp(`\\b${roomNumber}\\b`, "gi"), "")
            .replace(/^[\s\-–—,./|:;()]+|[\s\-–—,./|:;()]+$/g, "")
            .trim();
          if (stripped) {
            guestName = stripped;
          } else {
            guestName = `Verified Guest (Room ${roomNumber})`;
          }
        } else {
          guestName = rawGuestInput;
        }
      } else if (!guestName || guestName === "Verified Guest") {
        guestName = rating.anonymous ? "Anonymous Guest" : "Verified Guest";
      }

      const hasRoom = Boolean(roomNumber && roomNumber !== "Not specified" && roomNumber !== "Not provided");
      const hasName = Boolean(guestName && guestName !== "Verified Guest" && guestName !== "Anonymous Guest" && !guestName.startsWith("Verified Guest (Room"));
      const roomNumberFormatted = hasRoom ? `Room ${roomNumber}` : "Not specified";
      const guestNameDisplay = guestName || (hasRoom ? `Verified Guest (${roomNumberFormatted})` : "Verified Guest");
      const fullGuestNameWithRoom = hasRoom && hasName ? `${guestName} (${roomNumberFormatted})` : (hasRoom ? roomNumberFormatted : guestNameDisplay);

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

      const renderHtmlStarScore = (score: number) => {
        const rounded = Math.min(5, Math.max(1, Math.round(score)));
        const filled = "★ ".repeat(rounded).trim();
        const empty = rounded < 5 ? " ☆".repeat(5 - rounded) : "";
        return `<span style="color: #fbbf24; font-size: 22px; letter-spacing: 4px; text-shadow: 0 0 10px rgba(251,191,36,0.6);">${filled}</span>${empty ? `<span style="color: #475569; font-size: 22px; letter-spacing: 4px;">${empty}</span>` : ""}`;
      };

      const renderTextStarScore = (score: number) => {
        const rounded = Math.min(5, Math.max(1, Math.round(score)));
        return "⭐ ".repeat(rounded).trim();
      };

      const renderEmojiStars = renderTextStarScore;

      const getScoreLabel = (score: number) => {
        if (score >= 4.75) return "Exceptional";
        if (score >= 3.75) return "Very Good";
        if (score >= 2.75) return "Good";
        if (score >= 1.75) return "Fair / Needs Attention";
        return "Poor / Urgent Review";
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

      const defaultExperienceDesc = isCulinary
        ? "Evaluate your culinary journey across Orka Lotus Beach Hotel — covering flavor richness, buffet presentation, ingredient freshness, barista & mixology beverages, and attentive dining hospitality."
        : "Official executive guest evaluation for Orka Lotus Beach Hotel — upholding five-star Aegean hospitality, exemplary service quality standards, and personalized guest satisfaction.";

      const detailedDimensions = rating.detailedDimensions || {
        overall: { label: "Overall Experience", score: overall, stars: firstStars },
        hospitality: { label: "Hospitality & Warmth", score: hospScore, stars: hospStars },
        professionalism: { label: "Professionalism & Competence", score: profScore, stars: profStars },
        helpfulness: { label: "Helpfulness & Speed", score: helpScore, stars: helpStars },
        courtesy: { label: "Courtesy & Respect", score: courtScore, stars: courtStars },
        quality: { label: qualityDimensionLabel, score: qualScore, stars: qualStars },
      };

      const dimensionList = [
        {
          num: "01",
          key: "overall",
          name: "Overall Guest Experience",
          subtitle: "General satisfaction and Aegean resort experience",
          score: overall,
          starsHtml: renderHtmlStarScore(overall),
          starsText: renderTextStarScore(overall),
          starsPlain: renderStarHelper(overall),
          label: getScoreLabel(overall),
        },
        {
          num: "02",
          key: "hospitality",
          name: "Hospitality & Warmth",
          subtitle: "Friendliness, welcoming demeanor & guest care",
          score: hospScore,
          starsHtml: renderHtmlStarScore(hospScore),
          starsText: renderTextStarScore(hospScore),
          starsPlain: renderStarHelper(hospScore),
          label: getScoreLabel(hospScore),
        },
        {
          num: "03",
          key: "professionalism",
          name: "Professionalism & Competence",
          subtitle: "Expertise, demeanor & attentiveness",
          score: profScore,
          starsHtml: renderHtmlStarScore(profScore),
          starsText: renderTextStarScore(profScore),
          starsPlain: renderStarHelper(profScore),
          label: getScoreLabel(profScore),
        },
        {
          num: "04",
          key: "helpfulness",
          name: "Helpfulness & Speed",
          subtitle: "Efficiency, responsiveness & prompt service",
          score: helpScore,
          starsHtml: renderHtmlStarScore(helpScore),
          starsText: renderTextStarScore(helpScore),
          starsPlain: renderStarHelper(helpScore),
          label: getScoreLabel(helpScore),
        },
        {
          num: "05",
          key: "courtesy",
          name: "Courtesy & Respect",
          subtitle: "Politeness, dignity & considerate approach",
          score: courtScore,
          starsHtml: renderHtmlStarScore(courtScore),
          starsText: renderTextStarScore(courtScore),
          starsPlain: renderStarHelper(courtScore),
          label: getScoreLabel(courtScore),
        },
        {
          num: "06",
          key: "quality",
          name: qualityDimensionLabel,
          subtitle: isCulinary
            ? "Culinary excellence, beverage craft & fresh buffet presentation"
            : "Precision, operational execution & quality assurance",
          score: qualScore,
          starsHtml: renderHtmlStarScore(qualScore),
          starsText: renderTextStarScore(qualScore),
          starsPlain: renderStarHelper(qualScore),
          label: getScoreLabel(qualScore),
        },
      ];

      const secondaryStarsSummary = dimensionList
        .map((dim) => `${dim.name}: ${dim.starsPlain} (${dim.score.toFixed(1)}/5.0)`)
        .join(" • ");

      const detailedDimensionsBlock = [
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "⭐ DETAILED EXPERIENCE & SERVICE RATINGS ⭐",
        hasDetailed
          ? "(✓ Rated individually with secondary stars by guest)"
          : "(• Service & experience criteria evaluated in harmony with main rating)",
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        ...dimensionList.map(
          (dim) =>
            `${dim.num}. ${dim.name.toUpperCase()}\n` +
            `   Score: ${dim.score.toFixed(1)} / 5.0 — ${dim.label}\n` +
            `   Stars: ${dim.starsText} (${dim.starsPlain})\n` +
            `   --------------------------------------------------`
        ),
      ].join("\n");

      const rawUserComment = String(
        rating.rawComment ||
        rating.userComment ||
        rating.comment ||
        rating.feedback ||
        rating.compliments ||
        ""
      ).trim();

      const cleanRawUserComment = rawUserComment.includes("⭐ DETAILED EXPERIENCE & SERVICE")
        ? rawUserComment.split("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")[0].trim()
        : rawUserComment;

      const guestHeaderBlock = [
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "👤 GUEST & STAY IDENTIFICATION:",
        `• Box Filled (Name / Room): ${rawGuestInput || "Verified Guest"}`,
        `• Room Number: ${roomNumberFormatted}`,
        `• Guest Name: ${guestNameDisplay}`,
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      ].join("\n");

      const formattedCommentForAppsScript = cleanRawUserComment && cleanRawUserComment !== "No written feedback provided."
        ? `${guestHeaderBlock}\n\n💬 GUEST FEEDBACK:\n${cleanRawUserComment}\n\n${detailedDimensionsBlock}`
        : `${guestHeaderBlock}\n\n${detailedDimensionsBlock}`;

      const getRecLabel = (rec?: string) => {
        switch (rec) {
          case "absolutely":
            return "✓ Absolutely Recommended (100% Enthusiastic)";
          case "yes":
            return "✓ Yes, Highly Recommend";
          case "maybe":
            return "• Neutral / Maybe";
          case "probably_not":
            return "✗ Could Be Better / Needs Attention";
          default:
            return rec || "Not specified";
        }
      };

      const isRecommended = recommendation === "absolutely" || recommendation === "yes";

      const rtdbConsoleUrl = `https://console.firebase.google.com/project/orka-lotus-beach-marinaryu/database/orka-lotus-beach-marinaryu-default-rtdb/data/ratings/${ratingId}`;

      // Section-by-section HTML rendering: each dimension listed with stars on following line and divider on next rating
      const dimensionSectionsHtml = dimensionList
        .map((dim, idx) => {
          const isLast = idx === dimensionList.length - 1;
          return `
          <!-- SECTION ${dim.num}: ${dim.name} -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #0c2033 0%, #071524 100%); border: 1.5px solid #d4af37; border-radius: 12px; margin-bottom: 0; box-shadow: 0 4px 14px rgba(0,0,0,0.45); overflow: hidden;">
            <tr>
              <td style="padding: 14px 18px 12px 18px;">
                <!-- Line 1: Number, Dimension Title & Score Pill Badge -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="left" style="vertical-align: middle;">
                      <span style="display: inline-block; width: 22px; height: 22px; line-height: 22px; text-align: center; background: linear-gradient(135deg, #d4af37, #fef08a, #d4af37); color: #040e17; font-size: 11px; font-weight: 900; border-radius: 6px; margin-right: 8px; vertical-align: middle;">
                        ${dim.num}
                      </span>
                      <span style="font-size: 13px; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; color: #ffffff; vertical-align: middle;">
                        ${dim.name}
                      </span>
                    </td>
                    <td align="right" style="vertical-align: middle; white-space: nowrap;">
                      <span style="display: inline-block; padding: 4px 12px; background: linear-gradient(135deg, #102b43, #071724); border: 1.5px solid #d4af37; border-radius: 20px; font-size: 13px; font-weight: 900; color: #fef08a; font-family: Georgia, serif; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
                        ${dim.score.toFixed(1)} <span style="font-size: 11px; color: #cbd5e1; font-family: sans-serif; font-weight: 600;">/ 5.0</span>
                      </span>
                    </td>
                  </tr>
                </table>

                <!-- Line 2: Subtle Dimension Subtitle -->
                <div style="margin: 4px 0 0 30px; font-size: 11px; color: #94a3b8;">
                  ${dim.subtitle}
                </div>

                <!-- Line 3 (Following Line): Visual Star Rating & Status Badge -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #142a3f;">
                  <tr>
                    <td align="left" style="vertical-align: middle;">
                      <div style="font-size: 22px; line-height: 1; letter-spacing: 4px;">
                        ${dim.starsHtml}
                      </div>
                    </td>
                    <td align="right" style="vertical-align: middle; white-space: nowrap;">
                      <span style="display: inline-block; padding: 3px 10px; background-color: #061c30; border: 1px solid #2563eb; border-radius: 6px; font-size: 11px; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.5px;">
                        ${dim.label}
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          ${
            !isLast
              ? `<!-- Following line before next rating (divider) -->
          <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent); margin: 10px 0 10px 0;"></div>`
              : ""
          }
          `;
        })
        .join("");

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
        <!-- Main Container Card (Mirroring Website Modal Container) -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 660px; background-color: #081523; border: 2px solid #d4af37; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.85), 0 0 30px rgba(212,175,55,0.2);">
          
          <!-- Golden Shimmer Top Ribbon (Mirroring Website Shimmer Bar) -->
          <tr>
            <td style="height: 8px; background: linear-gradient(90deg, #996515, #fef08a, #e5c158, #996515);"></td>
          </tr>

          <!-- Header: Hotel Identity & Executive Quality Assurance -->
          <tr>
            <td style="padding: 26px 24px 20px 24px; text-align: center; background: linear-gradient(180deg, #0f2438 0%, #081523 100%); border-bottom: 2px solid #1c354d;">
              <span style="display: inline-block; padding: 4px 14px; background: linear-gradient(90deg, #d4af37, #fef08a, #d4af37); color: #040e17; font-size: 10px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; border-radius: 9999px; margin-bottom: 8px;">
                ORKA LOTUS BEACH HOTEL • MARMARIS
              </span>
              <h1 style="margin: 6px 0 0 0; font-size: 24px; font-weight: 900; letter-spacing: 0.5px; color: #ffffff; text-transform: uppercase; font-family: Georgia, serif;">
                ORKA LOTUS — NEW GUEST RANKING
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 12px; font-weight: 500; color: #94a3b8;">
                Executive Quality Assurance & Guest Experience Directorate
              </p>
            </td>
          </tr>

          <!-- TARGET IDENTITY BANNER (Matching Website Food & Beverage Card) -->
          <tr>
            <td style="padding: 20px 24px 16px 24px; background-color: #071421; border-bottom: 1px solid #142a3f;">
              <div style="background: linear-gradient(135deg, #0c2235, #081726); border: 1.5px solid #d4af37; border-radius: 14px; padding: 16px 20px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="left" style="vertical-align: middle;">
                      <span style="display: inline-block; padding: 3px 10px; background: linear-gradient(90deg, #d4af37, #fef08a, #d4af37); color: #040e17; font-size: 10px; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; border-radius: 9999px; margin-bottom: 4px;">
                        ${categoryName}
                      </span>
                      <h2 style="margin: 4px 0 0 0; font-size: 18px; font-weight: 900; color: #ffffff; font-family: Georgia, serif;">
                        ${targetName}
                      </h2>
                      <div style="margin-top: 3px; font-size: 11px; color: #94a3b8;">
                        ${sectionName} • Verified Service Experience
                      </div>
                    </td>
                  </tr>
                </table>
                <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #163654; font-size: 12px; color: #cbd5e1; line-height: 1.5;">
                  ${defaultExperienceDesc}
                </div>
              </div>
            </td>
          </tr>

          <!-- SECTION 1: PRIMARY OVERALL GUEST RATING (Matching Website Step 1) -->
          <tr>
            <td style="padding: 24px; text-align: center; background: radial-gradient(circle at center, #132a42 0%, #081523 75%); border-bottom: 1px solid #142a3f;">
              <div style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #11293e, #0b1c2b); border: 2px solid #d4af37; border-radius: 16px; box-shadow: 0 6px 24px rgba(212,175,55,0.3);">
                <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: #fef08a;">
                  PRIMARY OVERALL GUEST RATING
                </p>
                <div style="font-size: 46px; font-weight: 900; line-height: 1; color: #ffffff; font-family: Georgia, serif; text-shadow: 0 2px 10px rgba(0,0,0,0.6);">
                  ${overall.toFixed(1)} <span style="font-size: 20px; color: #d4af37; font-weight: 700;">/ 5.0</span>
                </div>
                <!-- Following line: Large prominent first stars -->
                <div style="margin-top: 10px; font-size: 28px; color: #fbbf24; letter-spacing: 6px; text-shadow: 0 0 14px rgba(251,191,36,0.7); line-height: 1;">
                  ${firstStars}
                </div>
                <div style="margin-top: 10px;">
                  <span style="display: inline-block; padding: 4px 14px; background: linear-gradient(90deg, #d4af37, #fef08a, #d4af37); color: #040e17; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; border-radius: 9999px;">
                    ★ ${overall.toFixed(1)} — ${getScoreLabel(overall)}
                  </span>
                </div>
              </div>
            </td>
          </tr>

          <!-- SECTION 2: RECOMMENDATION STATUS (Matching Website Step 2) -->
          <tr>
            <td style="padding: 16px 24px; background-color: #071421; border-bottom: 1px solid #142a3f;">
              <div style="background-color: ${isRecommended ? "#062b1e" : "#2a1b05"}; border: 1.5px solid ${isRecommended ? "#059669" : "#d97706"}; border-radius: 12px; padding: 12px 16px; text-align: center;">
                <span style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: ${isRecommended ? "#a7f3d0" : "#fde68a"};">
                  WOULD YOU RECOMMEND THIS EXPERIENCE?
                </span>
                <div style="margin-top: 4px; font-size: 14px; font-weight: 900; color: ${isRecommended ? "#34d399" : "#f59e0b"};">
                  ${getRecLabel(recommendation)}
                </div>
              </div>
            </td>
          </tr>

          <!-- SECTION 3: GUEST & STAY DETAILS -->
          <tr>
            <td style="padding: 20px 24px 16px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0b1a29; border: 1.5px solid #1c354d; border-radius: 14px; overflow: hidden;">
                <tr>
                  <td colspan="2" style="padding: 12px 18px; background: linear-gradient(135deg, #10263c, #0b1a29); border-bottom: 1px solid #1c354d; font-size: 11px; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; color: #fef08a;">
                    GUEST & SUBMISSION DETAILS
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; font-size: 12px; color: #94a3b8; width: 38%; border-bottom: 1px solid #142a3f;">
                    Name / Room Box Filled:
                  </td>
                  <td style="padding: 12px 18px; font-size: 13px; font-weight: 800; border-bottom: 1px solid #142a3f;">
                    ${rawGuestInput
                      ? `<span style="display: inline-block; padding: 4px 12px; background-color: rgba(254, 240, 138, 0.15); border: 1.5px solid #d4af37; border-radius: 8px; color: #fef08a; font-size: 13px; font-weight: 800; letter-spacing: 0.3px;">${rawGuestInput}</span>`
                      : `<span style="color: #94a3b8; font-style: italic;">Not provided (Anonymous / Verified Guest)</span>`}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; font-size: 12px; color: #94a3b8; border-bottom: 1px solid #142a3f;">
                    Room Number:
                  </td>
                  <td style="padding: 12px 18px; font-size: 13px; font-weight: 800; border-bottom: 1px solid #142a3f;">
                    ${hasRoom
                      ? `<span style="display: inline-block; padding: 4px 12px; background-color: rgba(52, 211, 153, 0.15); border: 1.5px solid #059669; border-radius: 8px; color: #34d399; font-size: 13px; font-weight: 800; letter-spacing: 0.5px;">✓ ${roomNumberFormatted}</span>`
                      : `<span style="color: #94a3b8; font-style: italic;">Not specified</span>`}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; font-size: 12px; color: #94a3b8; border-bottom: 1px solid #142a3f;">
                    Guest Name:
                  </td>
                  <td style="padding: 12px 18px; font-size: 13px; font-weight: 700; color: #ffffff; border-bottom: 1px solid #142a3f;">
                    ${guestNameDisplay}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 18px; font-size: 12px; color: #94a3b8; border-bottom: 1px solid #142a3f;">Submission Date & Time:</td>
                  <td style="padding: 11px 18px; font-size: 12px; font-weight: 600; color: #ffffff; border-bottom: 1px solid #142a3f;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 11px 18px; font-size: 12px; color: #94a3b8; border-bottom: 1px solid #142a3f;">Rating Reference ID:</td>
                  <td style="padding: 11px 18px; font-size: 12px; font-family: monospace; color: #d4af37; border-bottom: 1px solid #142a3f;">${ratingId}</td>
                </tr>
                <tr>
                  <td style="padding: 11px 18px; font-size: 12px; color: #94a3b8;">Executive Audit Status:</td>
                  <td style="padding: 11px 18px; font-size: 12px; font-weight: 700; color: #34d399;">✓ Official Executive Audit • Verified Guest Evaluation</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SECTION 4: DETAILED CULINARY & SERVICE DIMENSIONS (UNCOMPACTED, SECTION BY SECTION) -->
          <tr>
            <td style="padding: 8px 24px 20px 24px;">
              <!-- Section Category Header -->
              <div style="padding: 12px 18px; background: linear-gradient(135deg, #10263c, #0b1a29); border: 1.5px solid #d4af37; border-bottom: none; border-radius: 14px 14px 0 0;">
                <div style="font-size: 12px; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; color: #fef08a;">
                  ⭐ DETAILED EXPERIENCE & SERVICE DIMENSIONS
                </div>
                <div style="font-size: 11px; color: #94a3b8; margin-top: 3px;">
                  Listed section by section with visual star rating and score criteria (similar to website experience drawer)
                </div>
              </div>

              <!-- Uncompacted Dimension List: each section listed with star rating and following line before next rating -->
              <div style="background-color: #071421; border: 1.5px solid #d4af37; border-radius: 0 0 14px 14px; padding: 16px 16px 16px 16px;">
                ${dimensionSectionsHtml}
              </div>
            </td>
          </tr>

          <!-- SECTION 5: GUEST FEEDBACK & COMPLIMENTS -->
          <tr>
            <td style="padding: 0 24px 20px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0b1a29; border: 1.5px solid #d4af37; border-radius: 14px; overflow: hidden;">
                <tr>
                  <td style="padding: 12px 18px; background: linear-gradient(135deg, #10263c, #0b1a29); border-bottom: 1px solid #1c354d; font-size: 11px; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; color: #fef08a;">
                    GUEST FEEDBACK & COMPLIMENTS
                  </td>
                </tr>
                <tr>
                  <td style="padding: 18px; font-size: 13px; line-height: 1.7; color: ${cleanRawUserComment ? "#ffffff" : "#94a3b8"}; font-style: ${cleanRawUserComment ? "normal" : "italic"};">
                    ${cleanRawUserComment ? `“${cleanRawUserComment}”` : "No written comment or feedback was provided with this submission."}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SECTION 6: EXECUTIVE ACTION BUTTON -->
          <tr>
            <td style="padding: 0 24px 24px 24px; text-align: center;">
              <a href="${rtdbConsoleUrl}" target="_blank" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #d4af37, #fef08a, #d4af37); color: #040e17; text-decoration: none; font-size: 12px; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; border-radius: 10px; box-shadow: 0 4px 16px rgba(212,175,55,0.45);">
                VIEW IN FIREBASE REALTIME DATABASE →
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding: 18px 24px; background-color: #06111d; border-top: 1px solid #142a3f; text-align: center; font-size: 11px; color: #64748b; line-height: 1.6;">
              <p style="margin: 0; font-weight: 600; color: #94a3b8;">
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

      // Plain text fallback matching exact uncompacted section-by-section layout
      const textBody = `
ORKA LOTUS BEACH HOTEL — NEW GUEST RANKING
=====================================================
Target: ${targetName}
Department: ${categoryName} (${sectionName})
Experience: ${defaultExperienceDesc}

1. PRIMARY GUEST RATING
-----------------------------------------------------
Overall Score: ${overall.toFixed(1)} / 5.0 — ${getScoreLabel(overall)}
Stars: ${firstStars} (★★★★★)

2. RECOMMENDATION STATUS
-----------------------------------------------------
Recommendation: ${getRecLabel(recommendation)}

3. GUEST & SUBMISSION DETAILS
-----------------------------------------------------
"Your Name or Room Number" Box: ${rawGuestInput || "Not provided (Verified Guest)"}
Room Number: ${roomNumberFormatted}
Guest Name: ${guestNameDisplay}
Submission Time: ${formattedDate}
Rating ID: ${ratingId}
Audit Status: Verified Guest Evaluation

4. DETAILED EXPERIENCE & SERVICE RATINGS
-----------------------------------------------------
(Listed section by section with visual star rating and score)

${dimensionList
  .map(
    (dim) =>
      `${dim.num}. ${dim.name.toUpperCase()}\n` +
      `   Score: ${dim.score.toFixed(1)} / 5.0 — ${dim.label}\n` +
      `   Stars: ${dim.starsText} (${dim.starsPlain})\n` +
      `   --------------------------------------------------`
  )
  .join("\n\n")}

5. GUEST FEEDBACK & COMPLIMENTS
-----------------------------------------------------
${cleanRawUserComment ? `"${cleanRawUserComment}"` : "No written feedback was provided."}

=====================================================
Firebase RTDB Console: ${rtdbConsoleUrl}
Orka Lotus Beach Hotel Executive Quality Assurance Directorate
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
        // Explicit guest identity fields
        guestName: fullGuestNameWithRoom,
        roomNumber: roomNumberFormatted,
        room: roomNumberFormatted,
        guestRoom: roomNumberFormatted,
        roomNum: hasRoom ? roomNumber : "Not specified",
        rawGuestInput: rawGuestInput || "Verified Guest",
        nameOrRoom: rawGuestInput || "Verified Guest",
        nameOrRoomNumber: rawGuestInput || "Verified Guest",
        guestNameOrRoom: rawGuestInput || "Verified Guest",
        guestDisplayName: rawGuestInput || "Verified Guest",
        displayName: rawGuestInput || "Verified Guest",
        guestInfo: `${rawGuestInput || "Verified Guest"} | ${roomNumberFormatted} | ${guestNameDisplay}`,
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
