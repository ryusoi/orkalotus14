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
  rawGuestInput?: string;
  nameOrRoomNumber?: string;
  guestNameOrRoom?: string;
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
function parseGuestAndRoom(data: RatingData): {
  guestName: string;
  roomNumber: string;
  rawGuestInput: string;
  roomNumberFormatted: string;
  guestNameDisplay: string;
  hasRoom: boolean;
  hasName: boolean;
} {
  const rawGuestInput = String(
    data.rawGuestInput ||
    data.nameOrRoomNumber ||
    data.guestNameOrRoom ||
    data.guestDisplayName ||
    ""
  ).trim();

  let guestName = String(data.guestName || "").trim();
  let roomNumber = String(data.roomNumber || "").trim();

  if (roomNumber && roomNumber !== "Not specified" && roomNumber !== "Not provided") {
    roomNumber = roomNumber.replace(/^(?:room|oda|rm|номер|no|nr|zimm?er)\s*[:#-]?\s*/i, "").trim();
  } else {
    roomNumber = "";
  }

  const textToSearch = [rawGuestInput, guestName].filter(Boolean).join(" ");
  if (!roomNumber && textToSearch) {
    const keywordMatch = textToSearch.match(/(?:room|oda|rm|номер|no|nr|zimm?er)\s*[:#-]?\s*([a-zA-Z0-9-]+)/i);
    const numberMatch = textToSearch.match(/\b([0-9]{1,5}[a-zA-Z]?|[a-zA-Z][0-9]{1,4})\b/);
    const match = keywordMatch || numberMatch;
    if (match) {
      roomNumber = match[1].trim();
    }
  }

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
    guestName = data.anonymous ? "Anonymous Guest" : "Verified Guest";
  }

  const hasRoom = Boolean(roomNumber && roomNumber !== "Not specified" && roomNumber !== "Not provided");
  const hasName = Boolean(guestName && guestName !== "Verified Guest" && guestName !== "Anonymous Guest" && !guestName.startsWith("Verified Guest (Room"));
  const roomNumberFormatted = hasRoom ? `Room ${roomNumber}` : "Not specified";
  const guestNameDisplay = guestName || (hasRoom ? `Verified Guest (${roomNumberFormatted})` : "Verified Guest");

  return {
    guestName: hasRoom && hasName ? `${guestName} (${roomNumberFormatted})` : guestNameDisplay,
    roomNumber: roomNumberFormatted,
    rawGuestInput,
    roomNumberFormatted,
    guestNameDisplay,
    hasRoom,
    hasName,
  };
}

/**
 * Generates an SVG/HTML visual star representation for ratings.
 */
function renderStarScore(score: number): string {
  const rounded = Math.min(5, Math.max(1, Math.round(score)));
  return "★".repeat(rounded) + "☆".repeat(Math.max(0, 5 - rounded));
}

function renderHtmlStarScore(score: number): string {
  const rounded = Math.min(5, Math.max(1, Math.round(score)));
  const filled = "★ ".repeat(rounded).trim();
  const empty = rounded < 5 ? " ☆".repeat(5 - rounded) : "";
  return `<span style="color: #fbbf24; font-size: 22px; letter-spacing: 4px; text-shadow: 0 0 10px rgba(251,191,36,0.6);">${filled}</span>${empty ? `<span style="color: #475569; font-size: 22px; letter-spacing: 4px;">${empty}</span>` : ""}`;
}

function renderTextStarScore(score: number): string {
  const rounded = Math.min(5, Math.max(1, Math.round(score)));
  return "⭐ ".repeat(rounded).trim();
}

function getScoreLabel(score: number): string {
  if (score >= 4.75) return "Exceptional";
  if (score >= 3.75) return "Very Good";
  if (score >= 2.75) return "Good";
  if (score >= 1.75) return "Fair / Needs Attention";
  return "Poor / Urgent Review";
}

/**
 * Translates recommendation key to a readable label.
 */
function getRecommendationLabel(rec?: string): string {
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
}

/**
 * Builds luxury branded HTML email body for executive management notifications.
 */
function buildHtmlEmail(data: RatingData, ratingId: string): string {
  const overall = typeof data.overallRating === "number" ? data.overallRating : 5.0;
  const targetName = data.targetName || data.targetId || "Orka Lotus Beach Experience";
  const {
    guestName,
    roomNumber,
    rawGuestInput,
    roomNumberFormatted,
    guestNameDisplay,
    hasRoom,
    hasName,
  } = parseGuestAndRoom(data);
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

  const defaultExperienceDesc = isCulinary
    ? "Evaluate your culinary journey across Orka Lotus Beach Hotel — covering flavor richness, buffet presentation, ingredient freshness, barista & mixology beverages, and attentive dining hospitality."
    : "Official executive guest evaluation for Orka Lotus Beach Hotel — upholding five-star Aegean hospitality, exemplary service quality standards, and personalized guest satisfaction.";

  const dimensionList = [
    {
      num: "01",
      name: "Overall Guest Experience",
      subtitle: "General satisfaction and Aegean resort experience",
      score: overall,
      starsHtml: renderHtmlStarScore(overall),
      starsText: renderTextStarScore(overall),
      starsPlain: renderStarScore(overall),
      label: getScoreLabel(overall),
    },
    {
      num: "02",
      name: "Hospitality & Warmth",
      subtitle: "Friendliness, welcoming demeanor & guest care",
      score: hospScore,
      starsHtml: renderHtmlStarScore(hospScore),
      starsText: renderTextStarScore(hospScore),
      starsPlain: renderStarScore(hospScore),
      label: getScoreLabel(hospScore),
    },
    {
      num: "03",
      name: "Professionalism & Competence",
      subtitle: "Expertise, demeanor & attentiveness",
      score: profScore,
      starsHtml: renderHtmlStarScore(profScore),
      starsText: renderTextStarScore(profScore),
      starsPlain: renderStarScore(profScore),
      label: getScoreLabel(profScore),
    },
    {
      num: "04",
      name: "Helpfulness & Speed",
      subtitle: "Efficiency, responsiveness & prompt service",
      score: helpScore,
      starsHtml: renderHtmlStarScore(helpScore),
      starsText: renderTextStarScore(helpScore),
      starsPlain: renderStarScore(helpScore),
      label: getScoreLabel(helpScore),
    },
    {
      num: "05",
      name: "Courtesy & Respect",
      subtitle: "Politeness, dignity & considerate approach",
      score: courtScore,
      starsHtml: renderHtmlStarScore(courtScore),
      starsText: renderTextStarScore(courtScore),
      starsPlain: renderStarScore(courtScore),
      label: getScoreLabel(courtScore),
    },
    {
      num: "06",
      name: qualityDimensionLabel,
      subtitle: isCulinary
        ? "Culinary excellence, beverage craft & fresh buffet presentation"
        : "Precision, operational execution & quality assurance",
      score: qualScore,
      starsHtml: renderHtmlStarScore(qualScore),
      starsText: renderTextStarScore(qualScore),
      starsPlain: renderStarScore(qualScore),
      label: getScoreLabel(qualScore),
    },
  ];

  const feedbackText = (data.comment || data.feedback || data.compliments || "").trim();
  const isRecommended = data.recommendation === "absolutely" || data.recommendation === "yes";

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
        <!-- Main Container Card (Mirroring Website Modal Container) -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 660px; background-color: #081523; border: 2px solid #d4af37; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.85), 0 0 30px rgba(212,175,55,0.2);">
          
          <!-- Golden Shimmer Top Ribbon -->
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

          <!-- TARGET IDENTITY BANNER -->
          <tr>
            <td style="padding: 20px 24px 16px 24px; background-color: #071421; border-bottom: 1px solid #142a3f;">
              <div style="background: linear-gradient(135deg, #0c2235, #081726); border: 1.5px solid #d4af37; border-radius: 14px; padding: 16px 20px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="left" style="vertical-align: middle;">
                      <span style="display: inline-block; padding: 3px 10px; background: linear-gradient(90deg, #d4af37, #fef08a, #d4af37); color: #040e17; font-size: 10px; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; border-radius: 9999px; margin-bottom: 4px;">
                        ${data.categoryName || "General Service"}
                      </span>
                      <h2 style="margin: 4px 0 0 0; font-size: 18px; font-weight: 900; color: #ffffff; font-family: Georgia, serif;">
                        ${targetName}
                      </h2>
                      <div style="margin-top: 3px; font-size: 11px; color: #94a3b8;">
                        ${data.sectionName || "Hotel Services"} • Verified Service Experience
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

          <!-- SECTION 1: PRIMARY OVERALL GUEST RATING (FIRST STARS) -->
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

          <!-- SECTION 2: RECOMMENDATION STATUS -->
          <tr>
            <td style="padding: 16px 24px; background-color: #071421; border-bottom: 1px solid #142a3f;">
              <div style="background-color: ${isRecommended ? "#062b1e" : "#2a1b05"}; border: 1.5px solid ${isRecommended ? "#059669" : "#d97706"}; border-radius: 12px; padding: 12px 16px; text-align: center;">
                <span style="font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: ${isRecommended ? "#a7f3d0" : "#fde68a"};">
                  WOULD YOU RECOMMEND THIS EXPERIENCE?
                </span>
                <div style="margin-top: 4px; font-size: 14px; font-weight: 900; color: ${isRecommended ? "#34d399" : "#f59e0b"};">
                  ${getRecommendationLabel(data.recommendation)}
                </div>
              </div>
            </td>
          </tr>

          <!-- SECTION 3: GUEST & SUBMISSION DETAILS -->
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

          <!-- SECTION 4: DETAILED CULINARY & SERVICES STAR RANKING (UNCOMPACTED) -->
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

              <!-- Uncompacted Dimension List -->
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
                  <td style="padding: 18px; font-size: 13px; line-height: 1.7; color: ${feedbackText ? "#ffffff" : "#94a3b8"}; font-style: ${feedbackText ? "normal" : "italic"};">
                    ${feedbackText ? `“${feedbackText}”` : "No written comment or feedback was provided with this submission."}
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
  const {
    guestName,
    roomNumber,
    rawGuestInput,
    roomNumberFormatted,
    guestNameDisplay,
  } = parseGuestAndRoom(data);
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

  const dimensionList = [
    { num: "01", name: "Overall Guest Experience", score: overall },
    { num: "02", name: "Hospitality & Warmth", score: hospScore },
    { num: "03", name: "Professionalism & Competence", score: profScore },
    { num: "04", name: "Helpfulness & Speed", score: helpScore },
    { num: "05", name: "Courtesy & Respect", score: courtScore },
    { num: "06", name: qualityDimensionLabel, score: qualScore },
  ];

  const feedbackText = (data.comment || data.feedback || data.compliments || "").trim();

  return `
ORKA LOTUS — NEW GUEST RANKING
=====================================================
Target: ${targetName}
Section: ${data.sectionName || "Hotel Services"}
Category: ${data.categoryName || "General Service"}

1. PRIMARY GUEST RATING
-----------------------------------------------------
Score: ${overall.toFixed(1)} / 5.0 — ${getScoreLabel(overall)}
Stars: ${firstStars} (★★★★★)

2. RECOMMENDATION STATUS
-----------------------------------------------------
Recommendation: ${getRecommendationLabel(data.recommendation)}

3. GUEST & SUBMISSION DETAILS
-----------------------------------------------------
"Your Name or Room Number" Box: ${rawGuestInput || "Not provided (Verified Guest)"}
Room Number: ${roomNumberFormatted}
Guest Name: ${guestNameDisplay}
Submission Time: ${data.createdAt || new Date().toISOString()}
Rating ID: ${ratingId}
Audit Status: Verified Guest Evaluation

4. DETAILED EXPERIENCE & SERVICE RATINGS
-----------------------------------------------------
(Listed section by section with visual star rating and score)

${dimensionList
  .map(
    (dim) =>
      `${dim.num}. ${dim.name.toUpperCase()}\n` +
      `   Score: ${dim.score.toFixed(1)} / 5.0 — ${getScoreLabel(dim.score)}\n` +
      `   Stars: ${renderTextStarScore(dim.score)} (${renderStarScore(dim.score)})\n` +
      `   --------------------------------------------------`
  )
  .join("\n\n")}

5. GUEST FEEDBACK & COMPLIMENTS
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
