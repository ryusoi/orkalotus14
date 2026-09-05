# Orka Lotus Beach — Decoupled & Portable Architecture

## Overview

The Orka Lotus Beach Guest Experience application is **100% vendor-neutral, provider-agnostic, and fully decoupled**. It contains **zero** proprietary runtime locks or vendor-specific SDK dependencies, enabling deployment to any cloud provider, container engine, or self-hosted server.

---

## Decoupled Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    Client (React 19 + Vite)                   │
│        Aegean Riviera Editorial UI · i18n · Media Playback    │
└──────────────────────────────┬───────────────────────────────┘
                               │  tRPC Batch Link / REST
┌──────────────────────────────▼───────────────────────────────┐
│                    Server (Express + tRPC)                   │
│                Clean Provider-Agnostic Core                  │
└──────┬──────────────────────┬─────────────────┬──────────────┘
       │                      │                 │
┌──────▼──────┐       ┌───────▼───────┐ ┌───────▼───────┐
│ Auth Adapter│       │Storage Adapter│ │  AI Adapter   │
├─────────────┤       ├───────────────┤ ├───────────────┤
│ • Local JWT │       │ • Local Disk  │ │ • Gemini      │
│ • Generic   │       │ • S3 / R2     │ │ • OpenAI      │
│   OAuth     │       │ • MinIO / GCS │ │ • Anthropic   │
│ • Extensible│       │ • In-Memory   │ │ • Mock        │
└─────────────┘       └───────────────┘ └───────────────┘
```

---

## 1. Storage Adapters (`server/services/storage/`)

Configured via `STORAGE_PROVIDER` (`local`, `s3`, `memory`).

| Storage Provider | Description | Required Environment Variables |
|---|---|---|
| **Local Disk (Default)** | Saves files to `./uploads` with standalone static serving | `STORAGE_PROVIDER=local`, `STORAGE_LOCAL_DIR=uploads` |
| **AWS S3 / Cloudflare R2** | Standard S3-compatible object storage | `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_ENDPOINT` (optional for R2/MinIO) |
| **In-Memory / Data URL** | Zero-disk fallback for testing or ephemeral runtime | `STORAGE_PROVIDER=memory` |

---

## 2. Authentication Adapters (`server/services/auth/`)

Self-contained JWT session token authentication (`jose` standard HS256):

- **Local / Self-Hosted**: Signs standard JWT tokens stored in HTTP-only session cookies or `Authorization: Bearer <token>` headers.
- **Database User Sync**: Automatically provisions or matches users in MySQL, Postgres, SQLite, or in-memory map.
- **Generic OAuth**: Configurable OAuth endpoints (`OAUTH_CLIENT_ID`, `OAUTH_AUTH_URL`, `OAUTH_TOKEN_URL`, `OAUTH_USERINFO_URL`).

---

## 3. Database Layer (`server/db.ts`)

- Uses **Drizzle ORM** with standard MySQL / MariaDB connection pools.
- **Automatic In-Memory Fallback**: If `DATABASE_URL` is omitted or temporarily unreachable, the app operates gracefully without crashing, storing session and asset states in memory.

---

## 4. AI Adapters (`server/services/ai/`)

Configured via `AI_PROVIDER` (`gemini`, `openai`, `anthropic`, `mock`):

- **Google Gemini**: Standard Google GenAI endpoint via `GEMINI_API_KEY`.
- **OpenAI / OpenAI-Compatible**: Supports OpenAI, Groq, DeepSeek, vLLM, Ollama, OpenRouter via `OPENAI_API_KEY` and optional `OPENAI_BASE_URL`.
- **Anthropic**: Anthropic Claude API via `ANTHROPIC_API_KEY`.
- **Mock**: Self-contained fallback response generator when no API key is provided.

---

## 5. Deployment Options

### A. Docker / Any VPS
```bash
docker-compose up -d --build
```

### B. Node.js Standalone
```bash
npm install
npm run build
npm start
```

### C. Google Cloud Run / AWS ECS / Azure Container Apps
Build and push the multi-stage `Dockerfile`. Bind to `PORT=3000` or the injected `$PORT`.

### D. Vercel / Netlify
Static frontend in `dist/public`, server bundle in `dist/index.js` or serverless functions.
