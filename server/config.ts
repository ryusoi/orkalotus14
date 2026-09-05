import "dotenv/config";

export interface AppConfig {
  port: number;
  nodeEnv: string;
  isProduction: boolean;
  
  // Auth
  jwtSecret: string;
  sessionCookieName: string;
  adminOpenId?: string;
  adminEmail?: string;
  
  // Database
  databaseUrl?: string;
  databaseType: "mysql" | "postgres" | "sqlite" | "memory";
  
  // Storage
  storageProvider: "local" | "s3" | "memory";
  storageLocalDir: string;
  s3Config?: {
    bucket: string;
    region: string;
    endpoint?: string;
    accessKeyId: string;
    secretAccessKey: string;
    publicUrlPrefix?: string;
  };

  // AI / LLM
  aiProvider: "openai" | "gemini" | "anthropic" | "mock";
  openaiApiKey?: string;
  openaiBaseUrl?: string;
  geminiApiKey?: string;
  anthropicApiKey?: string;

  // Generic OAuth (optional)
  oauth?: {
    clientId?: string;
    clientSecret?: string;
    authorizationUrl?: string;
    tokenUrl?: string;
    userInfoUrl?: string;
    callbackUrl?: string;
  };
}

const getEnv = (key: string, fallback = ""): string => {
  return process.env[key] ?? fallback;
};

// Database type detection
function detectDatabaseType(url?: string): "mysql" | "postgres" | "sqlite" | "memory" {
  if (!url) return "memory";
  if (url.startsWith("mysql://") || url.startsWith("mysql2://")) return "mysql";
  if (url.startsWith("postgres://") || url.startsWith("postgresql://")) return "postgres";
  if (url.startsWith("sqlite://") || url.endsWith(".db") || url.endsWith(".sqlite")) return "sqlite";
  return "mysql";
}

// Storage provider detection
function detectStorageProvider(): "local" | "s3" | "memory" {
  const explicit = getEnv("STORAGE_PROVIDER").toLowerCase();
  if (explicit === "s3") return "s3";
  if (explicit === "memory") return "memory";
  if (explicit === "local") return "local";

  // Check if S3 credentials are present
  if (getEnv("S3_BUCKET") || getEnv("AWS_S3_BUCKET")) {
    return "s3";
  }

  // Default to local storage for portability
  return "local";
}

// AI provider detection
function detectAIProvider(): "openai" | "gemini" | "anthropic" | "mock" {
  const explicit = getEnv("AI_PROVIDER").toLowerCase();
  if (explicit === "openai" || explicit === "gemini" || explicit === "anthropic" || explicit === "mock") {
    return explicit;
  }
  if (getEnv("GEMINI_API_KEY")) return "gemini";
  if (getEnv("ANTHROPIC_API_KEY")) return "anthropic";
  return "gemini";
}

export const config: AppConfig = {
  port: parseInt(getEnv("PORT", "3000"), 10),
  nodeEnv: getEnv("NODE_ENV", "development"),
  isProduction: getEnv("NODE_ENV") === "production",
  
  jwtSecret: getEnv("JWT_SECRET", "orka_lotus_default_dev_secret_key_32chars!"),
  sessionCookieName: getEnv("SESSION_COOKIE_NAME", "app_session_id"),
  adminOpenId: getEnv("ADMIN_OPEN_ID") || getEnv("OWNER_OPEN_ID"),
  adminEmail: getEnv("ADMIN_EMAIL"),
  
  databaseUrl: getEnv("DATABASE_URL") || undefined,
  databaseType: detectDatabaseType(getEnv("DATABASE_URL")),
  
  storageProvider: detectStorageProvider(),
  storageLocalDir: getEnv("STORAGE_LOCAL_DIR", "uploads"),
  s3Config: (getEnv("S3_BUCKET") || getEnv("AWS_S3_BUCKET"))
    ? {
        bucket: getEnv("S3_BUCKET") || getEnv("AWS_S3_BUCKET"),
        region: getEnv("S3_REGION", getEnv("AWS_REGION", "us-east-1")),
        endpoint: getEnv("S3_ENDPOINT") || undefined,
        accessKeyId: getEnv("S3_ACCESS_KEY_ID") || getEnv("AWS_ACCESS_KEY_ID", ""),
        secretAccessKey: getEnv("S3_SECRET_ACCESS_KEY") || getEnv("AWS_SECRET_ACCESS_KEY", ""),
        publicUrlPrefix: getEnv("S3_PUBLIC_URL_PREFIX") || undefined,
      }
    : undefined,

  aiProvider: detectAIProvider(),
  openaiApiKey: getEnv("BUILT_IN_FORGE_API_KEY") || undefined,
  openaiBaseUrl: getEnv("OPENAI_BASE_URL") || (getEnv("BUILT_IN_FORGE_API_URL") ? `${getEnv("BUILT_IN_FORGE_API_URL").replace(/\/+$/, "")}/v1` : undefined),
  geminiApiKey: getEnv("GEMINI_API_KEY") || undefined,
  anthropicApiKey: getEnv("ANTHROPIC_API_KEY") || undefined,

  oauth: {
    clientId: getEnv("OAUTH_CLIENT_ID") || getEnv("VITE_APP_ID") || undefined,
    clientSecret: getEnv("OAUTH_CLIENT_SECRET") || undefined,
    authorizationUrl: getEnv("OAUTH_AUTH_URL") || getEnv("OAUTH_SERVER_URL") || undefined,
    tokenUrl: getEnv("OAUTH_TOKEN_URL") || undefined,
    userInfoUrl: getEnv("OAUTH_USERINFO_URL") || undefined,
    callbackUrl: getEnv("OAUTH_CALLBACK_URL") || undefined,
  },
};
