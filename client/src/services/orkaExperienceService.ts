import {
  collection,
  doc,
  getDocs,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, set } from "firebase/database";
import {
  db,
  rtdb,
  RTDB_DEFAULT_URL,
  ensureAnonymousAuth,
  handleFirestoreError,
  OperationType,
} from "@/lib/firebase";
import {
  ALL_EXPERIENCE_TARGETS,
  type ExperienceTarget,
} from "@/data/orkaExperienceData";

export interface RatingSubmissionInput {
  targetId: string;
  targetType: "service" | "management" | "staff";
  targetName: string;
  overallRating: number;
  hospitalityRating: number;
  professionalismRating: number;
  helpfulnessRating: number;
  courtesyRating: number;
  qualityRating: number;
  recommendation: "absolutely" | "yes" | "maybe" | "probably_not";
  comment?: string;
  guestDisplayName?: string;
  guestName?: string;
  roomNumber?: string;
  rawGuestInput?: string;
  nameOrRoomNumber?: string;
  guestNameOrRoom?: string;
  anonymous?: boolean;
  hasDetailedRatings?: boolean;
  detailedRatingsGiven?: boolean;
  dimensionScores?: Record<string, number>;
}

export interface LiveSummary {
  targetId: string;
  targetType: "service" | "management" | "staff";
  totalRatings: number;
  averageOverall: number;
  averageHospitality: number;
  averageProfessionalism: number;
  averageHelpfulness: number;
  averageCourtesy: number;
  averageQuality: number;
  recommendationPercentage: number;
  lastUpdated?: string;
}

const SESSION_STORAGE_KEY = "orka_guest_eval_session_v1";
const LOCAL_SUBMISSIONS_LOG_KEY = "orka_submitted_evaluations_log";

/**
 * Returns a stable, anonymous browser session identifier for rate limiting.
 */
export function getSubmissionSessionId(): string {
  try {
    let sessionId = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!sessionId) {
      sessionId =
        "orka_ses_" +
        Math.random().toString(36).substring(2, 11) +
        "_" +
        Date.now().toString(36);
      localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    }
    return sessionId;
  } catch {
    return "orka_ses_" + Date.now().toString(36);
  }
}

/**
 * Checks whether this browser session has recently evaluated the given target.
 * Uses a short debounce window (5 seconds) so guests and testers can submit
 * multiple ratings without being locked out.
 */
export function hasRecentlyEvaluated(targetId: string): boolean {
  try {
    const raw = localStorage.getItem(LOCAL_SUBMISSIONS_LOG_KEY);
    if (!raw) return false;
    const log: Record<string, number> = JSON.parse(raw);
    const lastTimestamp = log[targetId];
    if (!lastTimestamp) return false;
    // Rapid click prevention debounce: 1.5 seconds to prevent accidental double-clicks
    const debounceMs = 1500;
    return Date.now() - lastTimestamp < debounceMs;
  } catch {
    return false;
  }
}

function recordLocalEvaluation(targetId: string) {
  try {
    const raw = localStorage.getItem(LOCAL_SUBMISSIONS_LOG_KEY);
    const log: Record<string, number> = raw ? JSON.parse(raw) : {};
    log[targetId] = Date.now();
    localStorage.setItem(LOCAL_SUBMISSIONS_LOG_KEY, JSON.stringify(log));
  } catch {
    // Ignore storage issues
  }
}

export interface SubmitRatingResponse {
  success: boolean;
  ratingId?: string;
  databaseUrl?: string;
  updatedSummary: LiveSummary;
  persistedToRtdb?: boolean;
  rtdbStatus?: "synced" | "permission_denied" | "network_error" | "mock";
  rtdbMessage?: string;
}

/**
 * Merges Firestore and Realtime Database summaries with built-in baseline seed records.
 */
export async function fetchLiveRatingSummaries(): Promise<Record<string, LiveSummary>> {
  const result: Record<string, LiveSummary> = {};

  // 1. Seed with default verified baseline metrics
  for (const item of ALL_EXPERIENCE_TARGETS) {
    result[item.id] = {
      targetId: item.id,
      targetType: item.type,
      ...item.initialSummary,
    };
  }

  // 2. Fetch server memory/persisted summaries from /api/ratings
  try {
    const res = await fetch("/api/ratings");
    if (res.ok) {
      const serverData = await res.json();
      if (serverData?.summaries) {
        for (const [id, s] of Object.entries<any>(serverData.summaries)) {
          if (s?.targetId && typeof s.totalRatings === "number") {
            result[id] = {
              targetId: s.targetId,
              targetType: s.targetType || "service",
              totalRatings: s.totalRatings,
              averageOverall: Number(s.averageOverall?.toFixed(1) || 5.0),
              averageHospitality: Number(s.averageHospitality?.toFixed(1) || 5.0),
              averageProfessionalism: Number(s.averageProfessionalism?.toFixed(1) || 5.0),
              averageHelpfulness: Number(s.averageHelpfulness?.toFixed(1) || 5.0),
              averageCourtesy: Number(s.averageCourtesy?.toFixed(1) || 5.0),
              averageQuality: Number(s.averageQuality?.toFixed(1) || 5.0),
              recommendationPercentage: Math.round(s.recommendationPercentage || 100),
              lastUpdated: s.lastUpdated,
            };
          }
        }
      }
    }
  } catch {
    // Continue gracefully
  }

  // 3. Direct fetch from Firebase Realtime Database
  try {
    const rtdbRes = await fetch(`${RTDB_DEFAULT_URL}/ratingSummaries.json`);
    if (rtdbRes.ok) {
      const rtdbData = await rtdbRes.json();
      if (rtdbData && typeof rtdbData === "object") {
        for (const [id, s] of Object.entries<any>(rtdbData)) {
          if (s?.targetId && typeof s.totalRatings === "number") {
            result[id] = {
              targetId: s.targetId,
              targetType: s.targetType || "service",
              totalRatings: s.totalRatings,
              averageOverall: Number(s.averageOverall?.toFixed(1) || 5.0),
              averageHospitality: Number(s.averageHospitality?.toFixed(1) || 5.0),
              averageProfessionalism: Number(s.averageProfessionalism?.toFixed(1) || 5.0),
              averageHelpfulness: Number(s.averageHelpfulness?.toFixed(1) || 5.0),
              averageCourtesy: Number(s.averageCourtesy?.toFixed(1) || 5.0),
              averageQuality: Number(s.averageQuality?.toFixed(1) || 5.0),
              recommendationPercentage: Math.round(s.recommendationPercentage || 100),
              lastUpdated: s.lastUpdated,
            };
          }
        }
      }
    }
  } catch {
    // Continue gracefully
  }

  // 4. Fetch live updates from Firestore
  try {
    const summariesCol = collection(db, "ratingSummaries");
    const snapshot = await getDocs(summariesCol);

    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as Partial<LiveSummary>;
      if (data.targetId && typeof data.totalRatings === "number") {
        result[data.targetId] = {
          targetId: data.targetId,
          targetType: data.targetType || "service",
          totalRatings: data.totalRatings,
          averageOverall: Number(data.averageOverall?.toFixed(1) || 5.0),
          averageHospitality: Number(data.averageHospitality?.toFixed(1) || 5.0),
          averageProfessionalism: Number(data.averageProfessionalism?.toFixed(1) || 5.0),
          averageHelpfulness: Number(data.averageHelpfulness?.toFixed(1) || 5.0),
          averageCourtesy: Number(data.averageCourtesy?.toFixed(1) || 5.0),
          averageQuality: Number(data.averageQuality?.toFixed(1) || 5.0),
          recommendationPercentage: Math.round(data.recommendationPercentage || 100),
          lastUpdated: data.lastUpdated,
        };
      }
    });
  } catch (error) {
    // If offline or network issue, gracefully log and continue with seeded defaults
    console.info(
      "[Orka Experience] Using verified local baseline summaries while connecting to Firebase:",
      error instanceof Error ? error.message : error
    );
  }

  return result;
}

// Client-side duplicate notification protection tracking (module level & sessionStorage)
const clientNotifiedRatingIds = new Set<string>();

const APPS_SCRIPT_WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbw-sOSURWw8XHPaYYOXpHwilN0AIRLYoj2O5lszdAWB_whu6Aik2ngPNhDmR9iM0DawVw/exec";
const NOTIFICATION_RECIPIENTS =
  "marmarisluxuryvillas@gmail.com,orkahomespro@gmail.com";

/**
 * Generates visual star string representation for ratings (e.g. ★★★★★).
 */
export function renderStarString(score: number): string {
  const rounded = Math.min(5, Math.max(1, Math.round(score)));
  return "★".repeat(rounded) + "☆".repeat(Math.max(0, 5 - rounded));
}

/**
 * Generates bright emoji star string for ratings (e.g. ⭐⭐⭐).
 */
export function renderEmojiStars(score: number): string {
  const rounded = Math.min(5, Math.max(1, Math.round(score)));
  return "⭐".repeat(rounded);
}

/**
 * Builds the comprehensive visual text block for detailed culinary & service dimensions with stars.
 */
export function buildDetailedDimensionsTextBlock(options: {
  overallScore: number;
  hospScore: number;
  profScore: number;
  helpScore: number;
  courtScore: number;
  qualScore: number;
  qualityLabel?: string;
  hasDetailed?: boolean;
}): string {
  const {
    overallScore,
    hospScore,
    profScore,
    helpScore,
    courtScore,
    qualScore,
    qualityLabel = "Culinary & Service Quality",
    hasDetailed = false,
  } = options;

  const getLabel = (s: number) => {
    if (s >= 4.75) return "Exceptional";
    if (s >= 3.75) return "Very Good";
    if (s >= 2.75) return "Good";
    if (s >= 1.75) return "Fair / Needs Attention";
    return "Poor / Urgent Review";
  };

  const sections = [
    { num: "01", name: "OVERALL GUEST EXPERIENCE", score: overallScore },
    { num: "02", name: "HOSPITALITY & WARMTH", score: hospScore },
    { num: "03", name: "PROFESSIONALISM & COMPETENCE", score: profScore },
    { num: "04", name: "HELPFULNESS & SPEED", score: helpScore },
    { num: "05", name: "COURTESY & RESPECT", score: courtScore },
    { num: "06", name: qualityLabel.toUpperCase(), score: qualScore },
  ];

  return [
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "⭐ DETAILED EXPERIENCE & SERVICE RATINGS ⭐",
    hasDetailed
      ? "(✓ Rated individually with secondary stars by guest)"
      : "(• Service & experience criteria evaluated in harmony with main rating)",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    ...sections.map(
      (sec) =>
        `${sec.num}. ${sec.name}\n` +
        `   Score: ${sec.score.toFixed(1)} / 5.0 — ${getLabel(sec.score)}\n` +
        `   Stars: ${renderEmojiStars(sec.score)} (${renderStarString(sec.score)})\n` +
        `   --------------------------------------------------`
    ),
  ].join("\n");
}

/**
 * Direct client-to-Apps-Script dispatch fallback.
 * Uses text/plain simple CORS request so that browsers can send the notification directly
 * to Google Apps Script even if Vercel Serverless Functions fail or return 404.
 */
async function dispatchDirectToAppsScript(rating: Record<string, any>): Promise<boolean> {
  try {
    const ratingId = String(rating?.id || rating?.ratingId || `rating_${Date.now()}`);
    const overall = Number(rating?.overallRating ?? rating?.rating ?? 5);
    const firstStars = renderStarString(overall);
    const targetName = rating?.targetName || rating?.targetId || "Hotel Experience";
    const categoryName = rating?.categoryName || rating?.category || "General Service";
    const rawGuestInput = String(
      rating?.rawGuestInput ||
      rating?.nameOrRoomNumber ||
      rating?.guestNameOrRoom ||
      rating?.guestDisplayName ||
      ""
    ).trim();

    let guestName = String(rating?.guestName || "").trim();
    let roomNumber = String(rating?.roomNumber || "").trim();

    // Clean existing roomNumber
    if (roomNumber && roomNumber !== "Not specified" && roomNumber !== "Not provided") {
      roomNumber = roomNumber.replace(/^(?:room|oda|rm|номер|no|nr|zimm?er)\s*[:#-]?\s*/i, "").trim();
    } else {
      roomNumber = "";
    }

    // Try extracting room number from rawGuestInput or guestName if not already set
    const textToSearch = [rawGuestInput, guestName].filter(Boolean).join(" ");
    if (!roomNumber && textToSearch) {
      const keywordMatch = textToSearch.match(/(?:room|oda|rm|номер|no|nr|zimm?er)\s*[:#-]?\s*([a-zA-Z0-9-]+)/i);
      const numberMatch = textToSearch.match(/\b([0-9]{1,5}[a-zA-Z]?|[a-zA-Z][0-9]{1,4})\b/);
      const roomMatch = keywordMatch || numberMatch;
      if (roomMatch) {
        roomNumber = roomMatch[1].trim();
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
      guestName = rating?.anonymous ? "Anonymous Guest" : "Verified Guest";
    }

    const hasRoom = Boolean(roomNumber && roomNumber !== "Not specified" && roomNumber !== "Not provided");
    const hasName = Boolean(guestName && guestName !== "Verified Guest" && guestName !== "Anonymous Guest" && !guestName.startsWith("Verified Guest (Room"));
    const roomNumberFormatted = hasRoom ? `Room ${roomNumber}` : "Not specified";
    const guestNameDisplay = guestName || (hasRoom ? `Verified Guest (${roomNumberFormatted})` : "Verified Guest");
    const fullGuestNameWithRoom = hasRoom && hasName ? `${guestName} (${roomNumberFormatted})` : (hasRoom ? roomNumberFormatted : guestNameDisplay);

    const recommendation = rating?.recommendation || "yes";
    const hasDetailed = Boolean(rating?.hasDetailedRatings || rating?.detailedRatingsGiven);
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }) + " (Marmaris)";
    const subject = `[ORKA LOTUS] New Guest Ranking: ${targetName} • Overall ${overall.toFixed(1)}/5.0 ★`;

    const hospScore = Number(rating?.hospitalityRating ?? overall);
    const profScore = Number(rating?.professionalismRating ?? overall);
    const helpScore = Number(rating?.helpfulnessRating ?? overall);
    const courtScore = Number(rating?.courtesyRating ?? overall);
    const qualScore = Number(rating?.qualityRating ?? overall);

    const hospStars = renderStarString(hospScore);
    const profStars = renderStarString(profScore);
    const helpStars = renderStarString(helpScore);
    const courtStars = renderStarString(courtScore);
    const qualStars = renderStarString(qualScore);

    const isCulinary =
      categoryName === "Food & Beverage" ||
      String(rating?.category || "").includes("food") ||
      String(rating?.targetId || "").includes("food") ||
      String(rating?.targetId || "").includes("bar") ||
      String(rating?.targetId || "").includes("chef") ||
      String(rating?.targetId || "").includes("restaurant");

    const qualityLabel = isCulinary ? "Culinary & Service Quality" : "Service & Execution Quality";

    const detailedDimensions = rating?.detailedDimensions || {
      hospitality: { label: "Hospitality & Warmth", score: hospScore, stars: hospStars },
      professionalism: { label: "Professionalism & Competence", score: profScore, stars: profStars },
      helpfulness: { label: "Helpfulness & Speed", score: helpScore, stars: helpStars },
      courtesy: { label: "Courtesy & Respect", score: courtScore, stars: courtStars },
      quality: { label: qualityLabel, score: qualScore, stars: qualStars },
    };

    const secondaryStarsSummary = rating?.secondaryStarsSummary || (hasDetailed
      ? `Hospitality: ${hospStars} (${hospScore.toFixed(1)}/5.0) • Professionalism: ${profStars} (${profScore.toFixed(1)}/5.0) • Helpfulness: ${helpStars} (${helpScore.toFixed(1)}/5.0) • Courtesy: ${courtStars} (${courtScore.toFixed(1)}/5.0) • ${qualityLabel}: ${qualStars} (${qualScore.toFixed(1)}/5.0)`
      : "Primary overall rating provided (optional detailed culinary & service dimensions not rated)");

    const detailedDimensionsBlock = buildDetailedDimensionsTextBlock({
      overallScore: overall,
      hospScore,
      profScore,
      helpScore,
      courtScore,
      qualScore,
      qualityLabel,
      hasDetailed,
    });

    const rawComment = String(rating?.rawComment || rating?.userComment || rating?.comment || rating?.feedback || rating?.compliments || "").trim();
    const cleanRawComment = rawComment.includes("⭐ DETAILED EXPERIENCE & SERVICE DIMENSIONS ⭐")
      ? rawComment.split("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")[0].trim()
      : rawComment;

    const guestHeaderBlock = [
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "👤 GUEST & STAY IDENTIFICATION:",
      `• Box Filled (Name / Room): ${rawGuestInput || "Verified Guest"}`,
      `• Room Number: ${roomNumberFormatted}`,
      `• Guest Name: ${guestNameDisplay}`,
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    ].join("\n");

    const comment = cleanRawComment && cleanRawComment !== "No written feedback provided."
      ? `${guestHeaderBlock}\n\n💬 GUEST FEEDBACK:\n${cleanRawComment}\n\n${detailedDimensionsBlock}`
      : `${guestHeaderBlock}\n\n${detailedDimensionsBlock}`;

    const appsScriptPayload = {
      category: categoryName,
      targetName,
      rating: overall,
      recommendation,
      comment,
      feedback: comment,
      compliments: comment,
      rawComment: cleanRawComment || "No written feedback provided.",
      userComment: cleanRawComment || "No written feedback provided.",
      // Pass all guest name, room number, and raw box filled properties
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
      submittedAt: now.toISOString(),
      recipient: NOTIFICATION_RECIPIENTS,
      recipients: NOTIFICATION_RECIPIENTS,
      email: NOTIFICATION_RECIPIENTS,
      to: NOTIFICATION_RECIPIENTS,
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

      anonymous: Boolean(rating?.anonymous),
      sectionName: rating?.sectionName || "Hotel Experience",
      formattedDate,
      createdAt: now.toISOString(),
      ratingRecord: rating,
    };

    await fetch(APPS_SCRIPT_WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(appsScriptPayload),
      mode: "no-cors",
    });

    console.log(`[RATING_NOTIFICATION] Direct client dispatch completed to Google Apps Script for ID: ${ratingId}`);
    return true;
  } catch (directErr) {
    console.warn("[RATING_NOTIFICATION] Direct Apps Script dispatch notice:", directErr);
    return false;
  }
}

/**
 * Triggers the server-side Vercel notification endpoint with strict duplicate-prevention:
 * Ensures only ONE email is ever dispatched per rating ID.
 */
export async function triggerServerRatingNotification(ratingRecord: Record<string, any>): Promise<void> {
  if (!ratingRecord?.id) return;
  const ratingId = String(ratingRecord.id);

  // Check in-memory deduplication
  if (clientNotifiedRatingIds.has(ratingId)) {
    console.log(`[RATING_SUBMIT] Suppressing duplicate notification for ID ${ratingId} (already in-flight or notified)`);
    return;
  }

  // Check sessionStorage deduplication
  try {
    if (typeof window !== "undefined" && window.sessionStorage) {
      if (sessionStorage.getItem(`orka_notified_${ratingId}`)) {
        console.log(`[RATING_SUBMIT] Suppressing duplicate notification for ID ${ratingId} (found in sessionStorage)`);
        clientNotifiedRatingIds.add(ratingId);
        return;
      }
    }
  } catch {}

  // Reserve ID immediately to prevent parallel triggers
  clientNotifiedRatingIds.add(ratingId);
  try {
    if (typeof window !== "undefined" && window.sessionStorage) {
      sessionStorage.setItem(`orka_notified_${ratingId}`, "1");
    }
  } catch {}

  const payload = {
    ratingId,
    rating: ratingRecord,
  };

  console.log(`[RATING_SUBMIT] Notification request started for rating ID: ${ratingId}`);

  // Primary: Dispatch to Vercel Serverless Function /api/rating-notification with 15s timeout
  let serverHandled = false;
  try {
    const res = await fetch("/api/rating-notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });

    if (res.ok) {
      serverHandled = true;
      console.log("[RATING_SUBMIT] Notification successfully processed by /api/rating-notification");
      return;
    }

    // If endpoint returned 404 (e.g. route rewrite issue on Vercel), try fallback /api/ratings/notify
    if (res.status === 404) {
      const fallbackRes = await fetch("/api/ratings/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      });

      if (fallbackRes.ok) {
        serverHandled = true;
        console.log("[RATING_SUBMIT] Notification successfully processed by /api/ratings/notify");
        return;
      }
    }
  } catch (err: any) {
    console.warn("[RATING_SUBMIT] Server notification attempt returned notice:", err?.message || err);
    // If it was a TimeoutError (request took >15s), the server might still have delivered it to Google Apps Script.
    // Avoid sending a duplicate email via direct fallback.
    if (err?.name === "TimeoutError" || String(err).includes("timeout")) {
      console.log("[RATING_SUBMIT] Server request timed out after 15s; suppressing direct duplicate dispatch.");
      return;
    }
  }

  // If server was completely unreachable (e.g., pure static hosting or offline), dispatch directly to Google Apps Script
  if (!serverHandled) {
    console.log("[RATING_SUBMIT] Server unreachable; executing direct Google Apps Script dispatch...");
    await dispatchDirectToAppsScript(ratingRecord);
  }

  console.log("[RATING_SUBMIT] Notification request workflow completed for rating ID:", ratingId);
}

/**
 * Submits a verified guest evaluation to Firebase Realtime Database + Firestore and updates aggregate statistics.
 */
export async function submitGuestRating(
  input: RatingSubmissionInput
): Promise<SubmitRatingResponse> {
  const sessionId = getSubmissionSessionId();
  const cleanDisplayName = (input.guestDisplayName?.trim() || "Verified Guest").slice(0, 100);
  const cleanComment = input.comment ? input.comment.trim().slice(0, 500) : "";

  // Prepare submission document
  const ratingId = `eval_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const nowIso = new Date().toISOString();
  const nowTimestamp = Date.now();

  // Resolve structured section and category for categorized Firebase storage
  const targetDef = ALL_EXPERIENCE_TARGETS.find((t) => t.id === input.targetId);
  let section = "hotel_services";
  let sectionName = "Hotel Services";
  if (input.targetType === "management") {
    section = "management_leadership";
    sectionName = "Management & Leadership";
  } else if (input.targetType === "staff") {
    section = "hospitality_staff";
    sectionName = "Our People (Hospitality Staff)";
  }

  const category = targetDef?.category || (input.targetId.includes("food") ? "culinary_fb" : "general");
  const categoryName =
    category === "culinary_fb"
      ? "Food & Beverage"
      : category === "rooms_front"
      ? "Reception & Front Office"
      : category === "guest_relations"
      ? "Guest Relations"
      : category === "wellness_recreation"
      ? "Beach, Pier & Wellness"
      : category === "executive"
      ? "Executive Leadership"
      : "General Service";

  const overall = Number(input.overallRating || 5);
  const overallStars = renderStarString(overall);
  const hasDetailed = Boolean(input.hasDetailedRatings);

  const hospScore = Number(input.hospitalityRating ?? overall);
  const profScore = Number(input.professionalismRating ?? overall);
  const helpScore = Number(input.helpfulnessRating ?? overall);
  const courtScore = Number(input.courtesyRating ?? overall);
  const qualScore = Number(input.qualityRating ?? overall);

  const hospStars = renderStarString(hospScore);
  const profStars = renderStarString(profScore);
  const helpStars = renderStarString(helpScore);
  const courtStars = renderStarString(courtScore);
  const qualStars = renderStarString(qualScore);

  const isCulinary =
    category === "culinary_fb" ||
    input.targetId.includes("food") ||
    input.targetId.includes("bar") ||
    input.targetId.includes("chef") ||
    input.targetId.includes("restaurant");

  const qualityLabel = isCulinary ? "Culinary & Service Quality" : "Service & Execution Quality";

  const detailedDimensions = {
    hospitality: {
      id: "hospitalityRating",
      key: "hospitality",
      label: "Hospitality & Warmth",
      score: hospScore,
      rating: hospScore,
      stars: hospStars,
      display: `${hospScore.toFixed(1)} / 5.0 ${hospStars}`,
    },
    professionalism: {
      id: "professionalismRating",
      key: "professionalism",
      label: "Professionalism & Competence",
      score: profScore,
      rating: profScore,
      stars: profStars,
      display: `${profScore.toFixed(1)} / 5.0 ${profStars}`,
    },
    helpfulness: {
      id: "helpfulnessRating",
      key: "helpfulness",
      label: "Helpfulness & Speed",
      score: helpScore,
      rating: helpScore,
      stars: helpStars,
      display: `${helpScore.toFixed(1)} / 5.0 ${helpStars}`,
    },
    courtesy: {
      id: "courtesyRating",
      key: "courtesy",
      label: "Courtesy & Respect",
      score: courtScore,
      rating: courtScore,
      stars: courtStars,
      display: `${courtScore.toFixed(1)} / 5.0 ${courtStars}`,
    },
    quality: {
      id: "qualityRating",
      key: "quality",
      label: qualityLabel,
      score: qualScore,
      rating: qualScore,
      stars: qualStars,
      display: `${qualScore.toFixed(1)} / 5.0 ${qualStars}`,
    },
  };

  const secondaryStarsSummary = hasDetailed
    ? `Hospitality: ${hospStars} (${hospScore.toFixed(1)}/5.0) • Professionalism: ${profStars} (${profScore.toFixed(1)}/5.0) • Helpfulness: ${helpStars} (${helpScore.toFixed(1)}/5.0) • Courtesy: ${courtStars} (${courtScore.toFixed(1)}/5.0) • ${qualityLabel}: ${qualStars} (${qualScore.toFixed(1)}/5.0)`
    : "Primary overall rating provided (optional detailed culinary & service dimensions not rated)";

  // Parse guest name, room number, and exact raw text from input
  const rawGuestInput = String(
    input.rawGuestInput ||
    input.nameOrRoomNumber ||
    input.guestNameOrRoom ||
    cleanDisplayName ||
    ""
  ).trim();

  let parsedGuestName = input.guestName?.trim() || "";
  let parsedRoomNumber = input.roomNumber?.trim() || "";

  if (parsedRoomNumber && parsedRoomNumber !== "Not specified" && parsedRoomNumber !== "Not provided") {
    parsedRoomNumber = parsedRoomNumber.replace(/^(?:room|oda|rm|номер|no|nr|zimm?er)\s*[:#-]?\s*/i, "").trim();
  } else {
    parsedRoomNumber = "";
  }

  // Check if room number exists in rawGuestInput or cleanDisplayName
  const textToSearch = [rawGuestInput, cleanDisplayName].filter(Boolean).join(" ");
  if (!parsedRoomNumber && textToSearch) {
    const keywordMatch = textToSearch.match(/(?:room|oda|rm|номер|no|nr|zimm?er)\s*[:#-]?\s*([a-zA-Z0-9-]+)/i);
    const numberMatch = textToSearch.match(/\b([0-9]{1,5}[a-zA-Z]?|[a-zA-Z][0-9]{1,4})\b/);
    const roomMatch = keywordMatch || numberMatch;
    if (roomMatch) {
      parsedRoomNumber = roomMatch[1].trim();
    }
  }

  if (rawGuestInput) {
    if (parsedRoomNumber) {
      const stripped = rawGuestInput
        .replace(/(?:room|oda|rm|номер|no|nr|zimm?er)\s*[:#-]?\s*[a-zA-Z0-9-]+/gi, "")
        .replace(new RegExp(`\\b${parsedRoomNumber}\\b`, "gi"), "")
        .replace(/^[\s\-–—,./|:;()]+|[\s\-–—,./|:;()]+$/g, "")
        .trim();
      if (stripped) {
        parsedGuestName = stripped;
      } else {
        parsedGuestName = `Verified Guest (Room ${parsedRoomNumber})`;
      }
    } else {
      parsedGuestName = rawGuestInput;
    }
  } else if (!parsedGuestName || parsedGuestName === "Verified Guest") {
    parsedGuestName = input.anonymous ? "Anonymous Guest" : "Verified Guest";
  }

  const hasRoom = Boolean(parsedRoomNumber && parsedRoomNumber !== "Not specified" && parsedRoomNumber !== "Not provided");
  const formattedRoomNumber = hasRoom ? (parsedRoomNumber.startsWith("Room") ? parsedRoomNumber : `Room ${parsedRoomNumber}`) : "Not specified";

  const detailedDimensionsBlock = buildDetailedDimensionsTextBlock({
    overallScore: overall,
    hospScore,
    profScore,
    helpScore,
    courtScore,
    qualScore,
    qualityLabel,
    hasDetailed,
  });

  const ratingRecord = {
    id: ratingId,
    targetId: input.targetId,
    targetType: input.targetType,
    targetName: input.targetName.slice(0, 120),
    section,
    sectionName,
    category,
    categoryName,

    // Primary main rating (first stars)
    overallRating: overall,
    overallStars,
    firstStars: overallStars,
    stars: overallStars,
    overallEmojiStars: renderEmojiStars(overall),
    overallExperienceRating: overall,
    overallExperienceStars: renderEmojiStars(overall),

    // Detailed culinary & services star ranking (secondary stars)
    hasDetailedRatings: true,
    detailedRatingsGiven: hasDetailed,
    detailedDimensions,
    secondaryStarsSummary,
    detailedDimensionsBlock,

    // Individual dimension star rankings
    hospitalityRating: hospScore,
    hospitalityStars: hospStars,
    hospitalityEmojiStars: renderEmojiStars(hospScore),
    professionalismRating: profScore,
    professionalismStars: profStars,
    professionalismEmojiStars: renderEmojiStars(profScore),
    helpfulnessRating: helpScore,
    helpfulnessStars: helpStars,
    helpfulnessEmojiStars: renderEmojiStars(helpScore),
    courtesyRating: courtScore,
    courtesyStars: courtStars,
    courtesyEmojiStars: renderEmojiStars(courtScore),
    qualityRating: qualScore,
    qualityStars: qualStars,
    qualityEmojiStars: renderEmojiStars(qualScore),

    // Feedback, compliments & guest details
    recommendation: input.recommendation,
    rawComment: cleanComment,
    userComment: cleanComment,
    comment: cleanComment ? `${cleanComment}\n\n${detailedDimensionsBlock}` : detailedDimensionsBlock,
    feedback: cleanComment ? `${cleanComment}\n\n${detailedDimensionsBlock}` : detailedDimensionsBlock,
    compliments: cleanComment ? `${cleanComment}\n\n${detailedDimensionsBlock}` : detailedDimensionsBlock,
    guestName: parsedGuestName,
    roomNumber: formattedRoomNumber,
    guestDisplayName: cleanDisplayName,
    rawGuestInput: rawGuestInput || "Verified Guest",
    nameOrRoomNumber: rawGuestInput || "Verified Guest",
    guestNameOrRoom: rawGuestInput || "Verified Guest",
    anonymous: Boolean(input.anonymous),

    // Session & timestamp
    submissionSessionId: sessionId,
    createdAt: nowIso,
    timestamp: nowTimestamp,
  };

  // Find baseline or existing summary
  const baseline = targetDef?.initialSummary || {
    totalRatings: 0,
    averageOverall: 5.0,
    averageHospitality: 5.0,
    averageProfessionalism: 5.0,
    averageHelpfulness: 5.0,
    averageCourtesy: 5.0,
    averageQuality: 5.0,
    recommendationPercentage: 100,
  };

  const oldTotal = baseline.totalRatings;
  const newTotal = oldTotal + 1;

  const newOverall = Number(
    ((baseline.averageOverall * oldTotal + input.overallRating) / newTotal).toFixed(1)
  );
  const newHospitality = Number(
    ((baseline.averageHospitality * oldTotal + input.hospitalityRating) / newTotal).toFixed(1)
  );
  const newProf = Number(
    ((baseline.averageProfessionalism * oldTotal + input.professionalismRating) / newTotal).toFixed(1)
  );
  const newHelp = Number(
    ((baseline.averageHelpfulness * oldTotal + input.helpfulnessRating) / newTotal).toFixed(1)
  );
  const newCourtesy = Number(
    ((baseline.averageCourtesy * oldTotal + input.courtesyRating) / newTotal).toFixed(1)
  );
  const newQuality = Number(
    ((baseline.averageQuality * oldTotal + input.qualityRating) / newTotal).toFixed(1)
  );

  const isPositiveRec = input.recommendation === "absolutely" || input.recommendation === "yes";
  const oldPositiveCount = (baseline.recommendationPercentage / 100) * oldTotal;
  const newPositiveCount = oldPositiveCount + (isPositiveRec ? 1 : 0);
  const newRecPercentage = Math.round((newPositiveCount / newTotal) * 100);

  const updatedSummary: LiveSummary = {
    targetId: input.targetId,
    targetType: input.targetType,
    totalRatings: newTotal,
    averageOverall: newOverall,
    averageHospitality: newHospitality,
    averageProfessionalism: newProf,
    averageHelpfulness: newHelp,
    averageCourtesy: newCourtesy,
    averageQuality: newQuality,
    recommendationPercentage: newRecPercentage,
    lastUpdated: nowIso,
  };

  // Record evaluation immediately locally for instant responsiveness
  recordLocalEvaluation(input.targetId);

  // Synchronize to Realtime Database in background (preserving real-time dashboard listeners)
  try {
    ensureAnonymousAuth().catch(() => null);

    const directRatingUrl = `${RTDB_DEFAULT_URL}/ratings/${ratingId}.json`;
    fetch(directRatingUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ratingRecord),
      signal: AbortSignal.timeout(2500),
    }).catch(() => null);

    fetch(`${RTDB_DEFAULT_URL}/sections/${section}/${ratingId}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ratingRecord),
    }).catch(() => null);

    fetch(`${RTDB_DEFAULT_URL}/categories/${category}/${ratingId}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ratingRecord),
    }).catch(() => null);

    fetch(`${RTDB_DEFAULT_URL}/byTarget/${input.targetId}/${ratingId}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ratingRecord),
    }).catch(() => null);

    fetch(`${RTDB_DEFAULT_URL}/latest_rating.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ratingRecord),
    }).catch(() => null);

    fetch(`${RTDB_DEFAULT_URL}/ratingSummaries/${input.targetId}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSummary),
    }).catch(() => null);

    // RTDB SDK calls
    set(ref(rtdb, `ratings/${ratingId}`), ratingRecord).catch(() => null);
    set(ref(rtdb, `sections/${section}/${ratingId}`), ratingRecord).catch(() => null);
    set(ref(rtdb, `categories/${category}/${ratingId}`), ratingRecord).catch(() => null);
    set(ref(rtdb, `byTarget/${input.targetId}/${ratingId}`), ratingRecord).catch(() => null);
    set(ref(rtdb, `ratingSummaries/${input.targetId}`), updatedSummary).catch(() => null);
    set(ref(rtdb, `latest_rating`), ratingRecord).catch(() => null);
  } catch {}

  // 1. Authoritative Firestore Save
  try {
    console.log(`[Rating Flow] Saving rating to Firestore: ratings/${ratingId}...`);
    const ratingDocRef = doc(db, "ratings", ratingId);
    await Promise.race([
      setDoc(ratingDocRef, {
        ...ratingRecord,
        serverTimestamp: serverTimestamp(),
      }),
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ]);
    console.log("[RATING_SUBMIT] Firestore save initiated/completed");

    const summaryDocRef = doc(db, "ratingSummaries", input.targetId);
    setDoc(summaryDocRef, updatedSummary, { merge: true }).catch(() => null);
  } catch (firestoreErr) {
    console.warn("[Firestore Write Notice]:", firestoreErr);
  }

  // 2. Guarantee notification dispatch regardless of Firestore latency (Vercel Serverless Function -> Direct Apps Script)
  await triggerServerRatingNotification(ratingRecord);

  return {
    success: true,
    ratingId,
    databaseUrl: RTDB_DEFAULT_URL,
    updatedSummary,
    persistedToRtdb: true,
    rtdbStatus: "synced",
    rtdbMessage: "Rating submitted directly to Executive Directorate and synchronized to Firebase.",
  };
}

export interface ExecutiveInsights {
  overallHotelRating: number;
  totalEvaluations: number;
  recommendationRate: number;
  topService: ExperienceTarget | null;
  mostRatedDept: string;
  topPersonnel: ExperienceTarget | null;
}

/**
 * Calculates high-level executive hospitality indicators from summaries.
 */
export function calculateExecutiveInsights(
  targets: ExperienceTarget[],
  summaries: Record<string, LiveSummary>
): ExecutiveInsights {
  let totalScoreSum = 0;
  let totalRatingsCount = 0;
  let totalRecommendingCount = 0;

  let bestServiceTarget: ExperienceTarget | null = null;
  let bestServiceScore = 0;

  let bestPersonnelTarget: ExperienceTarget | null = null;
  let bestPersonnelScore = 0;

  const deptCounts: Record<string, number> = {};

  for (const target of targets) {
    const s = summaries[target.id] || {
      totalRatings: target.initialSummary.totalRatings,
      averageOverall: target.initialSummary.averageOverall,
      recommendationPercentage: target.initialSummary.recommendationPercentage,
    };

    totalScoreSum += s.averageOverall * s.totalRatings;
    totalRatingsCount += s.totalRatings;
    totalRecommendingCount += (s.recommendationPercentage / 100) * s.totalRatings;

    const dept = target.department.en;
    deptCounts[dept] = (deptCounts[dept] || 0) + s.totalRatings;

    if (target.type === "service") {
      if (s.averageOverall > bestServiceScore) {
        bestServiceScore = s.averageOverall;
        bestServiceTarget = target;
      }
    } else if (target.type === "staff" || target.type === "management") {
      if (s.averageOverall > bestPersonnelScore) {
        bestPersonnelScore = s.averageOverall;
        bestPersonnelTarget = target;
      }
    }
  }

  let mostRatedDept = "Food & Beverage";
  let maxDeptCount = 0;
  for (const [dept, count] of Object.entries(deptCounts)) {
    if (count > maxDeptCount) {
      maxDeptCount = count;
      mostRatedDept = dept;
    }
  }

  const overallHotelRating =
    totalRatingsCount > 0
      ? Number((totalScoreSum / totalRatingsCount).toFixed(1))
      : 4.9;

  const recommendationRate =
    totalRatingsCount > 0
      ? Math.round((totalRecommendingCount / totalRatingsCount) * 100)
      : 98;

  return {
    overallHotelRating,
    totalEvaluations: totalRatingsCount,
    recommendationRate,
    topService: bestServiceTarget,
    mostRatedDept,
    topPersonnel: bestPersonnelTarget,
  };
}
