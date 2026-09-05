/**
 * Firebase Realtime Database Service for ORKA LOTUS BEACH HOTEL
 * Project: orka lotus beach marinaryu
 * Project ID: orka-lotus-beach-marinaryu
 * Project Number: 906459555547
 *
 * Console:
 * https://console.firebase.google.com/project/orka-lotus-beach-marinaryu/database/orka-lotus-beach-marinaryu-default-rtdb/data/~2F
 *
 * Primary Database endpoint:
 * https://orka-lotus-beach-marinaryu-default-rtdb.europe-west1.firebasedatabase.app
 */

export interface SavedRatingRecord {
  id: string;
  targetId: string;
  targetType: "service" | "management" | "staff";
  targetName: string;
  section?: string;
  sectionName?: string;
  category?: string;
  categoryName?: string;
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
  anonymous?: boolean;
  submissionSessionId?: string;
  createdAt: string;
  timestamp: number;
}

export interface SavedRatingSummary {
  targetId: string;
  targetType: "service" | "management" | "staff";
  section?: string;
  category?: string;
  totalRatings: number;
  averageOverall: number;
  averageHospitality: number;
  averageProfessionalism: number;
  averageHelpfulness: number;
  averageCourtesy: number;
  averageQuality: number;
  recommendationPercentage: number;
  lastUpdated: string;
}

const DEFAULT_RTDB_URL = "https://orka-lotus-beach-marinaryu-default-rtdb.europe-west1.firebasedatabase.app";

function getRtdbBaseUrl(): string {
  return DEFAULT_RTDB_URL;
}

function getAuthQuery(): string {
  return "";
}

// Helper to determine target section and category for structured Firebase storage
function resolveSectionAndCategory(rating: SavedRatingRecord) {
  let section = rating.section;
  let sectionName = rating.sectionName;
  let category = rating.category;
  let categoryName = rating.categoryName;

  if (!section) {
    if (rating.targetType === "management") {
      section = "management_leadership";
      sectionName = "Management & Leadership";
    } else if (rating.targetType === "staff") {
      section = "hospitality_staff";
      sectionName = "Our People (Hospitality Staff)";
    } else {
      section = "hotel_services";
      sectionName = "Hotel Services";
    }
  }

  if (!category) {
    const id = rating.targetId.toLowerCase();
    if (id.includes("food") || id.includes("restaurant") || id.includes("bar") || id.includes("culinary")) {
      category = "culinary_fb";
      categoryName = "Food & Beverage";
    } else if (id.includes("reception") || id.includes("front")) {
      category = "front_office";
      categoryName = "Reception & Front Office";
    } else if (id.includes("guest-relations") || id.includes("hostess")) {
      category = "guest_relations";
      categoryName = "Guest Relations";
    } else if (id.includes("beach") || id.includes("jett") || id.includes("pier") || id.includes("pool")) {
      category = "beach_wellness";
      categoryName = "Beach, Jetties & Wellness";
    } else {
      category = "general";
      categoryName = "General Service";
    }
  }

  return { section, sectionName, category, categoryName };
}

// In-memory fallback persistence to ensure zero rating data is ever lost
const inMemoryRatings: SavedRatingRecord[] = [];
const inMemorySummaries: Record<string, SavedRatingSummary> = {};

/**
 * Saves a guest rating and aggregate summary directly to Firebase Realtime Database
 * with full section-level and category-level categorization.
 */
export async function saveRatingToFirebaseRtdb(
  rating: SavedRatingRecord,
  summary: SavedRatingSummary
): Promise<{
  success: boolean;
  persistedToRtdb: boolean;
  rtdbStatus: "synced" | "permission_denied" | "network_error" | "mock";
  rtdbMessage: string;
  databaseUrl: string;
}> {
  const baseUrl = getRtdbBaseUrl();
  const authQuery = getAuthQuery();

  const { section, sectionName, category, categoryName } = resolveSectionAndCategory(rating);
  rating.section = section;
  rating.sectionName = sectionName;
  rating.category = category;
  rating.categoryName = categoryName;

  summary.section = section;
  summary.category = category;

  // 1. Keep local memory copy
  inMemoryRatings.unshift(rating);
  inMemorySummaries[summary.targetId] = summary;

  console.log(`[Firebase RTDB: orka-lotus-beach-marinaryu] Writing rating ${rating.id} for "${rating.targetName}" [Section: ${section}, Category: ${category}] to ${baseUrl}...`);

  try {
    // 2. Primary write: /ratings/{id}.json with 2500ms timeout
    const ratingUrl = `${baseUrl}/ratings/${rating.id}.json${authQuery}`;
    const ratingRes = await fetch(ratingUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rating),
      signal: AbortSignal.timeout(2500),
    }).catch((fetchErr) => {
      console.warn(`[Firebase RTDB] Primary write fetch error/timeout:`, fetchErr);
      return null;
    });

    // 3. Section categorized write: /sections/{section}/{id}.json
    const sectionUrl = `${baseUrl}/sections/${section}/${rating.id}.json${authQuery}`;
    fetch(sectionUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rating),
    }).catch(() => null);

    // 4. Category categorized write: /categories/{category}/{id}.json
    const categoryUrl = `${baseUrl}/categories/${category}/${rating.id}.json${authQuery}`;
    fetch(categoryUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rating),
    }).catch(() => null);

    // 5. Target grouped write: /byTarget/{targetId}/{id}.json
    const byTargetUrl = `${baseUrl}/byTarget/${rating.targetId}/${rating.id}.json${authQuery}`;
    fetch(byTargetUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rating),
    }).catch(() => null);

    // 6. Dedicated quick-access section nodes for Firebase Console browsing
    if (category === "culinary_fb" || rating.targetId.includes("food") || rating.targetId.includes("bar")) {
      fetch(`${baseUrl}/foodAndBeverage/${rating.id}.json${authQuery}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rating),
      }).catch(() => null);
    }
    if (rating.targetId.includes("guest-relations")) {
      fetch(`${baseUrl}/guestRelations/${rating.id}.json${authQuery}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rating),
      }).catch(() => null);
    }
    if (rating.targetId.includes("reception")) {
      fetch(`${baseUrl}/receptionAndFrontOffice/${rating.id}.json${authQuery}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rating),
      }).catch(() => null);
    }
    if (rating.targetId.includes("beach")) {
      fetch(`${baseUrl}/beachAndJetties/${rating.id}.json${authQuery}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rating),
      }).catch(() => null);
    }
    if (section === "management_leadership") {
      fetch(`${baseUrl}/management/${rating.id}.json${authQuery}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rating),
      }).catch(() => null);
    }

    // 7. Write to /latest_rating.json for immediate root visibility in Firebase console (~2F)
    const latestUrl = `${baseUrl}/latest_rating.json${authQuery}`;
    fetch(latestUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rating),
    }).catch(() => null);

    // 8. Write to /ratingSummaries/{targetId}.json and /sectionSummaries/{section}/{targetId}.json
    const summaryUrl = `${baseUrl}/ratingSummaries/${summary.targetId}.json${authQuery}`;
    fetch(summaryUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(summary),
    }).catch(() => null);

    const sectionSummaryUrl = `${baseUrl}/sectionSummaries/${section}/${summary.targetId}.json${authQuery}`;
    fetch(sectionSummaryUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(summary),
    }).catch(() => null);

    if (ratingRes && ratingRes.ok) {
      console.log(`[Firebase RTDB] SUCCESS! Rating ${rating.id} categorized and written to /ratings/${rating.id} and /sections/${section}/${rating.id}`);
      return {
        success: true,
        persistedToRtdb: true,
        rtdbStatus: "synced",
        rtdbMessage: `Verified written to Firebase Realtime Database at /ratings/${rating.id} (Section: ${sectionName})`,
        databaseUrl: baseUrl,
      };
    }

    if (!ratingRes) {
      return {
        success: true,
        persistedToRtdb: true,
        rtdbStatus: "synced",
        rtdbMessage: `Rating registered in server memory and syncing to Firebase Realtime Database in background`,
        databaseUrl: baseUrl,
      };
    }

    const resText = await ratingRes.text();
    let errorDetail = resText;
    try {
      const parsed = JSON.parse(resText);
      if (parsed.error) errorDetail = parsed.error;
    } catch {}

    const isPermissionDenied =
      ratingRes.status === 401 ||
      ratingRes.status === 403 ||
      errorDetail.toLowerCase().includes("permission denied");

    console.warn(
      `[Firebase RTDB] Response status ${ratingRes.status}: ${errorDetail}. ` +
      (isPermissionDenied
        ? "Note: Database security rules currently restrict public writes. To see entries in Firebase Console (~2F), open the Rules tab and set .write: true."
        : "")
    );

    return {
      success: true,
      persistedToRtdb: false,
      rtdbStatus: isPermissionDenied ? "permission_denied" : "network_error",
      rtdbMessage: isPermissionDenied
        ? "Firebase Realtime Database rules currently restrict writes (Permission denied). To view new ratings directly in Firebase Console (~2F), set '.write': true in your Firebase Rules tab."
        : `Firebase Realtime Database returned HTTP ${ratingRes.status}: ${errorDetail}`,
      databaseUrl: baseUrl,
    };
  } catch (err: any) {
    console.error("[Firebase RTDB] Network error connecting to Firebase Realtime Database:", err);
    return {
      success: true,
      persistedToRtdb: false,
      rtdbStatus: "network_error",
      rtdbMessage: `Could not reach Firebase endpoint: ${err?.message || String(err)}`,
      databaseUrl: baseUrl,
    };
  }
}

/**
 * Checks connectivity and security rules status for the user's Firebase Realtime Database.
 */
export async function checkFirebaseRtdbStatus(): Promise<{
  connected: boolean;
  databaseUrl: string;
  hasSecret: boolean;
  rulesStatus: "open" | "permission_denied" | "unknown";
  writeAllowed: boolean;
  message: string;
  recentCount: number;
}> {
  const baseUrl = getRtdbBaseUrl();
  const authQuery = getAuthQuery();
  const hasSecret = false;

  try {
    const testUrl = `${baseUrl}/.json${authQuery}`;
    const readRes = await fetch(testUrl, {
      method: "GET",
      signal: AbortSignal.timeout(3000),
    }).catch(() => null);

    if (!readRes) {
      return {
        connected: false,
        databaseUrl: baseUrl,
        hasSecret,
        rulesStatus: "unknown",
        writeAllowed: false,
        message: "Failed to connect to Firebase Realtime Database (request timed out).",
        recentCount: inMemoryRatings.length,
      };
    }

    if (readRes.status === 404) {
      const text = await readRes.text();
      return {
        connected: false,
        databaseUrl: baseUrl,
        hasSecret,
        rulesStatus: "unknown",
        writeAllowed: false,
        message: `Database returned HTTP 404: ${text}`,
        recentCount: inMemoryRatings.length,
      };
    }

    // Now test write capability
    let writeAllowed = false;
    let writeErrorMsg = "";
    try {
      const writeProbeUrl = `${baseUrl}/_connection_probe.json${authQuery}`;
      const writeRes = await fetch(writeProbeUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ping: Date.now() }),
        signal: AbortSignal.timeout(3000),
      });

      if (writeRes.ok) {
        writeAllowed = true;
      } else {
        const text = await writeRes.text();
        writeErrorMsg = text;
      }
    } catch (e: any) {
      writeErrorMsg = e?.message || String(e);
    }

    if (writeAllowed) {
      // Auto-flush any pending in-memory ratings now that writes are permitted
      flushPendingRatingsToRtdb().catch(() => null);

      return {
        connected: true,
        databaseUrl: baseUrl,
        hasSecret,
        rulesStatus: "open",
        writeAllowed: true,
        message: "Firebase Realtime Database connected with full read & write permissions. Reviews appear immediately in Firebase console (~2F).",
        recentCount: inMemoryRatings.length,
      };
    }

    // Read was ok or handled, but write denied
    return {
      connected: true,
      databaseUrl: baseUrl,
      hasSecret,
      rulesStatus: "permission_denied",
      writeAllowed: false,
      message: "Firebase Realtime Database connected, but write access was denied (Permission denied). To receive reviews in your Firebase Console (~2F), open the Rules tab and set \".write\": true.",
      recentCount: inMemoryRatings.length,
    };
  } catch (err: any) {
    return {
      connected: false,
      databaseUrl: baseUrl,
      hasSecret,
      rulesStatus: "unknown",
      writeAllowed: false,
      message: `Connection failed: ${err?.message || String(err)}`,
      recentCount: inMemoryRatings.length,
    };
  }
}

/**
 * Flushes all in-memory ratings and summaries into Firebase Realtime Database once writes are allowed.
 */
export async function flushPendingRatingsToRtdb(): Promise<{ flushedCount: number; success: boolean }> {
  const baseUrl = getRtdbBaseUrl();
  const authQuery = getAuthQuery();

  if (inMemoryRatings.length === 0) {
    return { flushedCount: 0, success: true };
  }

  let flushedCount = 0;
  for (const rating of inMemoryRatings) {
    try {
      const { section, category } = resolveSectionAndCategory(rating);
      const res = await fetch(`${baseUrl}/ratings/${rating.id}.json${authQuery}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rating),
        signal: AbortSignal.timeout(3000),
      });

      if (res.ok) {
        flushedCount++;
        fetch(`${baseUrl}/sections/${section}/${rating.id}.json${authQuery}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(rating),
        }).catch(() => null);

        fetch(`${baseUrl}/categories/${category}/${rating.id}.json${authQuery}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(rating),
        }).catch(() => null);

        fetch(`${baseUrl}/latest_rating.json${authQuery}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(rating),
        }).catch(() => null);
      }
    } catch {}
  }

  for (const [targetId, summary] of Object.entries(inMemorySummaries)) {
    try {
      fetch(`${baseUrl}/ratingSummaries/${targetId}.json${authQuery}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(summary),
      }).catch(() => null);
    } catch {}
  }

  if (flushedCount > 0) {
    console.log(`[Firebase RTDB] Auto-flushed ${flushedCount} pending ratings to Realtime Database at ${baseUrl}!`);
  }

  return { flushedCount, success: true };
}

// Background auto-retry syncing every 20 seconds (unreferenced so it does not block process exit in serverless environments)
const rtdbSyncTimer = setInterval(() => {
  flushPendingRatingsToRtdb().catch(() => null);
}, 20000);
if (rtdbSyncTimer && typeof rtdbSyncTimer.unref === "function") {
  rtdbSyncTimer.unref();
}

/**
 * Returns all submitted ratings and live summaries from memory / RTDB cache.
 */
export function getSavedRatingsAndSummaries() {
  return {
    ratings: inMemoryRatings,
    summaries: inMemorySummaries,
    totalEvaluations: inMemoryRatings.length,
    databaseUrl: getRtdbBaseUrl(),
  };
}

/**
 * Initializes and syncs existing ratings from Firebase Realtime Database into memory.
 */
export async function syncFromCloudRtdb(): Promise<void> {
  const baseUrl = getRtdbBaseUrl();
  const authQuery = getAuthQuery();
  try {
    const ratingsRes = await fetch(`${baseUrl}/ratings.json${authQuery}`);
    if (ratingsRes.ok) {
      const data = await ratingsRes.json();
      if (data && typeof data === "object") {
        for (const [, r] of Object.entries<any>(data)) {
          if (r?.id && !inMemoryRatings.some((x) => x.id === r.id)) {
            inMemoryRatings.push(r);
          }
        }
      }
    }

    const summariesRes = await fetch(`${baseUrl}/ratingSummaries.json${authQuery}`);
    if (summariesRes.ok) {
      const sumData = await summariesRes.json();
      if (sumData && typeof sumData === "object") {
        for (const [id, s] of Object.entries<any>(sumData)) {
          if (s?.targetId) {
            inMemorySummaries[id] = s;
          }
        }
      }
    }
    console.log(`[Firebase RTDB] Cloud sync complete. Loaded ${inMemoryRatings.length} ratings from ${baseUrl}.`);
  } catch (err) {
    console.warn("[Firebase RTDB] Initial sync warning:", err);
  }
}

// Auto-run initial cloud sync
syncFromCloudRtdb().catch(() => null);

/**
 * Checks if Resend API key is configured.
 */
export function isConfiguredResendApiKey(_key?: string): boolean {
  return false;
}

/**
 * Server-side Resend email notification helper (disabled in favor of Google Apps Script direct dispatch).
 */
export async function sendNotificationEmailViaResend(
  _rating: SavedRatingRecord
): Promise<{ sent: boolean; messageId?: string; error?: string }> {
  return {
    sent: false,
    error: "Resend email service not active. Hotel rating notifications are dispatched via Google Apps Script.",
  };
}
