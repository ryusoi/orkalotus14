import { onValueCreated } from "firebase-functions/v2/database";
import { defineSecret, defineString } from "firebase-functions/params";
import { logger } from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { Resend } from "resend";

// Initialize Firebase Admin SDK
initializeApp();

// Define secrets and environment parameters
// Store RESEND_API_KEY securely via: firebase functions:secrets:set RESEND_API_KEY
const resendApiKeySecret = defineSecret("RESEND_API_KEY");

const managementEmailParam = defineString("MANAGEMENT_NOTIFICATION_EMAIL", {
  default: "marinauniryu@gmail.com",
  description: "Destination management email address for executive guest rankings",
});

const fromEmailParam = defineString("RESEND_FROM_EMAIL", {
  default: "Orka Lotus Beach <onboarding@resend.dev>",
  description: "Verified Resend sender email address or onboarding domain",
});

interface RatingData {
  id?: string;
  targetId?: string;
  targetType?: "service" | "management" | "staff" | string;
  targetName?: string;
  section?: string;
  sectionName?: string;
  category?: string;
  categoryName?: string;
  overallRating?: number;
  overallStars?: string;
  firstStars?: string;
  stars?: string;
  hasDetailedRatings?: boolean;
  detailedRatingsGiven?: boolean;
  secondaryStarsSummary?: string;
  detailedDimensions?: Record<string, any>;
  hospitalityRating?: number;
  hospitalityStars?: string;
  professionalismRating?: number;
  professionalismStars?: string;
  helpfulnessRating?: number;
  helpfulnessStars?: string;
  courtesyRating?: number;
  courtesyStars?: string;
  qualityRating?: number;
  qualityStars?: string;
  recommendation?: "absolutely" | "yes" | "maybe" | "probably_not" | string;
  comment?: string;
  feedback?: string;
  compliments?: string;
  guestDisplayName?: string;
  guestName?: string;
  roomNumber?: string;
  anonymous?: boolean;
  submissionSessionId?: string;
  createdAt?: string;
  timestamp?: number;
}

function isConfiguredResendApiKey(key?: string): boolean {
  if (!key || typeof key !== "string") return false;
  const trimmed = key.trim();
  if (
    !trimmed.startsWith("re_") ||
    trimmed.length < 24 ||
    trimmed === "re_123456789_abcdefg" ||
    trimmed.includes("123456789") ||
    trimmed.includes("abcdefg") ||
    trimmed.includes("placeholder") ||
    trimmed.includes("your_api_key") ||
    trimmed.includes("example") ||
    trimmed === "re_test"
  ) {
    return false;
  }
  return true;
}

/**
 * Extracts guest name and room number cleanly from data or display name string.
 */
function parseGuestAndRoom(data: RatingData): { guestName: string; roomNumber: string } {
  let guestName = (data.guestName || "").trim();
  let roomNumber = (data.roomNumber || "").trim();

  if ((!guestName || guestName === "Verified Guest") && data.guestDisplayName) {
    const raw = data.guestDisplayName.trim();
    // Check for room number patterns (e.g. "Room 1402", "Oda 204", "Rm 310", "1402")
    const roomMatch =
      raw.match(/(?:room|oda|rm|номер|no|nr|zimm?er)\s*[:#-]?\s*([a-zA-Z0-9-]+)/i) ||
      raw.match(/\b([0-9]{3,4}[a-zA-Z]?)\b/);
    if (roomMatch) {
      if (!roomNumber || roomNumber === "Not provided" || roomNumber === "Not specified") {
        roomNumber = roomMatch[1];
      }
      const stripped = raw
        .replace(/(?:room|oda|rm|номер|no|nr|zimm?er)\s*[:#-]?\s*[a-zA-Z0-9-]+/gi, "")
        .replace(new RegExp(`\\b${roomMatch[1]}\\b`, "g"), "")
        .replace(/^[\s\-–—,./|:]+|[\s\-–—,./|:]+$/g, "")
        .trim();
      if (stripped) {
        guestName = stripped;
      }
    } else {
      guestName = raw;
    }
  }

  if (!guestName) {
    guestName = data.anonymous ? "Anonymous Guest" : "Verified Guest";
  }
  if (!roomNumber || roomNumber === "Not provided") {
    roomNumber = "Not specified";
  }

  return { guestName, roomNumber };
}

/**
 * Generates an SVG/HTML visual star representation for ratings.
 */
function renderStarScore(score: number): string {
  const fullStars = Math.floor(score);
  const halfStar = score - fullStars >= 0.5;
  const stars: string[] = [];

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push("★");
    } else if (i === fullStars && halfStar) {
      stars.push("★");
    } else {
      stars.push("☆");
    }
  }
  return stars.join(" ");
}

/**
 * Translates recommendation key to a readable label.
 */
function getRecommendationLabel(rec?: string): string {
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
}

/**
 * Builds luxury branded HTML email body for executive management notifications.
 */
function buildHtmlEmail(data: RatingData, ratingId: string): string {
  const overall = typeof data.overallRating === "number" ? data.overallRating : 5.0;
  const targetName = data.targetName || data.targetId || "Orka Lotus Beach Experience";
  const { guestName, roomNumber } = parseGuestAndRoom(data);
  const firstStars = data.firstStars || renderStarScore(overall);

  const formattedDate = data.createdAt
    ? new Date(data.createdAt).toLocaleString("en-GB", {
        timeZone: "Europe/Istanbul",
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }) + " (Marmaris, TR)"
    : new Date().toUTCString();

  const rtdbConsoleUrl = `https://console.firebase.google.com/project/orka-lotus-beach-marinaryu/database/orka-lotus-beach-marinaryu-default-rtdb/data/ratings/${ratingId}`;

  // Check if optional detailed culinary & services dimensions were rated
  const hasDetailed = Boolean(
    data.hasDetailedRatings ||
    data.detailedRatingsGiven ||
    (data.hospitalityRating && data.hospitalityRating !== overall) ||
    (data.professionalismRating && data.professionalismRating !== overall) ||
    (data.helpfulnessRating && data.helpfulnessRating !== overall) ||
    (data.courtesyRating && data.courtesyRating !== overall) ||
    (data.qualityRating && data.qualityRating !== overall)
  );

  const hospScore = Number(data.hospitalityRating ?? overall);
  const profScore = Number(data.professionalismRating ?? overall);
  const helpScore = Number(data.helpfulnessRating ?? overall);
  const courtScore = Number(data.courtesyRating ?? overall);
  const qualScore = Number(data.qualityRating ?? overall);

  const hospStars = data.hospitalityStars || renderStarScore(hospScore);
  const profStars = data.professionalismStars || renderStarScore(profScore);
  const helpStars = data.helpfulnessStars || renderStarScore(helpScore);
  const courtStars = data.courtesyStars || renderStarScore(courtScore);
  const qualStars = data.qualityStars || renderStarScore(qualScore);

  const isCulinary =
    data.categoryName === "Food & Beverage" ||
    data.category === "culinary_fb" ||
    String(data.targetId || "").includes("food") ||
    String(data.targetId || "").includes("bar") ||
    String(data.targetId || "").includes("chef") ||
    String(data.targetId || "").includes("restaurant");

  const qualityDimensionLabel = isCulinary
    ? "Culinary & Service Quality"
    : "Service & Execution Quality";

  const feedbackText = (data.comment || data.feedback || data.compliments || "").trim();

  return `
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
        <!-- Main Card Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 640px; background-color: #081523; border: 2px solid #996515; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.75);">
          
          <!-- Golden Shimmer Top Ribbon -->
          <tr>
            <td style="height: 6px; background: linear-gradient(90deg, #996515, #fef08a, #e5c158, #996515);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 28px 24px 20px 24px; text-align: center; background: linear-gradient(180deg, #0f2438 0%, #081523 100%); border-bottom: 1px solid #1c354d;">
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
                ${data.sectionName || "Hotel Services"} • ${data.categoryName || "General Service"}
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
                  <td style="padding: 10px 16px; font-size: 12px; font-weight: 700; color: #34d399; border-bottom: 1px solid #142a3f;">${getRecommendationLabel(data.recommendation)}</td>
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
                  <td style="padding: 16px; font-size: 13px; line-height: 1.6; color: ${feedbackText ? "#ffffff" : "#94a3b8"}; font-style: ${feedbackText ? "normal" : "italic"};">
                    ${feedbackText ? `“${feedbackText}”` : "No written comment or feedback was provided with this submission."}
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
                Orka Lotus Beach Hotel Quality Assurance System • Automated Realtime Notification
              </p>
              <p style="margin: 4px 0 0 0; font-size: 10px; color: #475569;">
                Target ID: ${data.targetId || "N/A"} • Session: ${data.submissionSessionId || "N/A"} • Region: europe-west1
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
}

/**
 * Plain text fallback email.
 */
function buildTextEmail(data: RatingData, ratingId: string): string {
  const overall = typeof data.overallRating === "number" ? data.overallRating : 5.0;
  const targetName = data.targetName || data.targetId || "Orka Lotus Beach Experience";
  const { guestName, roomNumber } = parseGuestAndRoom(data);
  const firstStars = data.firstStars || renderStarScore(overall);

  const hasDetailed = Boolean(
    data.hasDetailedRatings ||
    data.detailedRatingsGiven ||
    (data.hospitalityRating && data.hospitalityRating !== overall) ||
    (data.professionalismRating && data.professionalismRating !== overall) ||
    (data.helpfulnessRating && data.helpfulnessRating !== overall) ||
    (data.courtesyRating && data.courtesyRating !== overall) ||
    (data.qualityRating && data.qualityRating !== overall)
  );

  const hospScore = Number(data.hospitalityRating ?? overall);
  const profScore = Number(data.professionalismRating ?? overall);
  const helpScore = Number(data.helpfulnessRating ?? overall);
  const courtScore = Number(data.courtesyRating ?? overall);
  const qualScore = Number(data.qualityRating ?? overall);

  const hospStars = data.hospitalityStars || renderStarScore(hospScore);
  const profStars = data.professionalismStars || renderStarScore(profScore);
  const helpStars = data.helpfulnessStars || renderStarScore(helpScore);
  const courtStars = data.courtesyStars || renderStarScore(courtScore);
  const qualStars = data.qualityStars || renderStarScore(qualScore);

  const isCulinary =
    data.categoryName === "Food & Beverage" ||
    data.category === "culinary_fb" ||
    String(data.targetId || "").includes("food") ||
    String(data.targetId || "").includes("bar") ||
    String(data.targetId || "").includes("chef") ||
    String(data.targetId || "").includes("restaurant");

  const qualityDimensionLabel = isCulinary
    ? "Culinary & Service Quality"
    : "Service & Execution Quality";

  const feedbackText = (data.comment || data.feedback || data.compliments || "").trim();

  return `
ORKA LOTUS — NEW GUEST RANKING
=====================================================
Target: ${targetName}
Section: ${data.sectionName || "Hotel Services"}
Category: ${data.categoryName || "General Service"}

1. PRIMARY GUEST RATING (FIRST STARS)
-----------------------------------------------------
Score: ${overall.toFixed(1)} / 5.0
First Stars: ${firstStars}

2. GUEST & SUBMISSION DETAILS
-----------------------------------------------------
Guest Name: ${guestName}
Room Number: ${roomNumber}
Recommendation: ${getRecommendationLabel(data.recommendation)}
Submission Time: ${data.createdAt || new Date().toISOString()}
Rating ID: ${ratingId}

3. DETAILED CULINARY & SERVICES STAR RANKING (SECONDARY STARS)
-----------------------------------------------------
${hasDetailed ? "✓ In-depth optional criteria rated by guest with secondary stars:" : "• Service & experience criteria rated in harmony with main rating:"}
- Overall Experience: ${overall.toFixed(1)} / 5.0 ${firstStars}
- Hospitality & Warmth: ${hospScore.toFixed(1)} / 5.0 ${hospStars}
- Professionalism & Competence: ${profScore.toFixed(1)} / 5.0 ${profStars}
- Helpfulness & Speed: ${helpScore.toFixed(1)} / 5.0 ${helpStars}
- Courtesy & Respect: ${courtScore.toFixed(1)} / 5.0 ${courtStars}
- ${qualityDimensionLabel}: ${qualScore.toFixed(1)} / 5.0 ${qualStars}

4. GUEST FEEDBACK & COMPLIMENTS
-----------------------------------------------------
${feedbackText ? `"${feedbackText}"` : "(No written feedback or compliments provided)"}

=====================================================
Target ID: ${data.targetId || "N/A"}
Session ID: ${data.submissionSessionId || "N/A"}
Firebase Console: https://console.firebase.google.com/project/orka-lotus-beach-marinaryu/database/orka-lotus-beach-marinaryu-default-rtdb/data/ratings/${ratingId}
  `.trim();
}

/**
 * Firebase Cloud Function triggered ONLY when a NEW guest ranking is added to Realtime Database at /ratings/{ratingId}.
 * It never triggers on edits or updates.
 */
export const onNewGuestRanking = onValueCreated(
  {
    ref: "/ratings/{ratingId}",
    instance: "orka-lotus-beach-marinaryu-default-rtdb",
    region: "europe-west1",
    secrets: [resendApiKeySecret],
  },
  async (event) => {
    const ratingId = event.params.ratingId;
    const data = event.data.val() as RatingData;

    logger.info(`[Orka Notification] Detected NEW guest ranking created at /ratings/${ratingId}`, {
      ratingId,
      targetId: data?.targetId,
      targetName: data?.targetName,
      overallRating: data?.overallRating,
    });

    if (!data) {
      logger.warn(`[Orka Notification] Empty payload for rating ${ratingId}, skipping email.`);
      return;
    }

    // Retrieve Resend API key securely from secret or environment
    const apiKey = resendApiKeySecret.value() || process.env.RESEND_API_KEY;
    if (!isConfiguredResendApiKey(apiKey)) {
      logger.info(
        `[Orka Notification] RESEND_API_KEY is not configured with an active live key. Skipping email notification.`
      );
      return;
    }

    const managementEmail =
      managementEmailParam.value() ||
      process.env.MANAGEMENT_NOTIFICATION_EMAIL ||
      "marinauniryu@gmail.com";

    const fromEmail =
      fromEmailParam.value() ||
      process.env.RESEND_FROM_EMAIL ||
      "Orka Lotus Beach <onboarding@resend.dev>";

    try {
      const resend = new Resend(apiKey);
      const overall = typeof data.overallRating === "number" ? data.overallRating : 5.0;
      const targetName = data.targetName || data.targetId || "Hotel Experience";

      const subject = `[ORKA LOTUS] New Guest Ranking: ${targetName} • Overall ${overall.toFixed(1)}/5.0 ★`;

      const html = buildHtmlEmail(data, ratingId);
      const text = buildTextEmail(data, ratingId);

      logger.info(`[Orka Notification] Dispatching email to ${managementEmail} via Resend...`);

      const result = await resend.emails.send({
        from: fromEmail,
        to: [managementEmail],
        subject,
        html,
        text,
      });

      if (result.error) {
        logger.error(`[Orka Notification] Resend API error sending notification for ${ratingId}:`, result.error);
        return;
      }

      logger.info(`[Orka Notification] SUCCESS! Notification email sent for rating ${ratingId}. Resend Message ID: ${result.data?.id}`);
    } catch (err: any) {
      logger.error(`[Orka Notification] Unexpected failure sending email for rating ${ratingId}:`, {
        error: err?.message || String(err),
        stack: err?.stack,
      });
    }
  }
);
