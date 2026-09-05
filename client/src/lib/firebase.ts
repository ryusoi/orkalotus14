import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDocFromServer,
  type Firestore,
} from "firebase/firestore";
import { getDatabase, type Database } from "firebase/database";
import { getAuth, signInAnonymously, type Auth } from "firebase/auth";

export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

// User-provided Firebase Realtime Database for project: orka lotus beach marinaryu (906459555547)
// https://console.firebase.google.com/project/orka-lotus-beach-marinaryu/database/orka-lotus-beach-marinaryu-default-rtdb/data/~2F
export const RTDB_DEFAULT_URL =
  "https://orka-lotus-beach-marinaryu-default-rtdb.europe-west1.firebasedatabase.app";

const normalizedDatabaseUrl = RTDB_DEFAULT_URL;

// Client Firebase configuration with project: orka lotus beach marinaryu
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForOrkaLotusBeach01",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "orka-lotus-beach-marinaryu.firebaseapp.com",
  databaseURL: normalizedDatabaseUrl,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "orka-lotus-beach-marinaryu",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "orka-lotus-beach-marinaryu.appspot.com",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "906459555547",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:906459555547:web:orka-lotus-beach-marinaryu-app",
};

let app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);
export const rtdb: Database = getDatabase(app, firebaseConfig.databaseURL);
export const auth: Auth = getAuth(app);

let anonymousAuthAttempted = false;

/**
 * Initializes anonymous authentication where available for anti-spam token verification.
 */
export async function ensureAnonymousAuth(): Promise<string | null> {
  if (anonymousAuthAttempted && auth.currentUser) {
    return auth.currentUser.uid;
  }
  anonymousAuthAttempted = true;
  try {
    const cred = await signInAnonymously(auth);
    return cred.user.uid;
  } catch (err) {
    // If anonymous auth is not yet enabled in Firebase Console, fallback to device session ID
    console.warn(
      "[Orka Firebase] Anonymous auth not enabled or failed, continuing with device session fallback:",
      err
    );
    return null;
  }
}

/**
 * Structured Firestore error handler conforming to the Firebase Integration Skill.
 */
export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Tests live connection to Firestore on initialization.
 */
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
    return true;
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.includes("the client is offline") ||
        error.message.includes("offline") ||
        error.message.includes("unavailable") ||
        error.message.includes("network"))
    ) {
      console.warn(
        "[Orka Firebase] Firestore operating in offline/client-mode. Ratings will sync when online."
      );
      return false;
    }
    return false;
  }
}
