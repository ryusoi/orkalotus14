# ORKA LOTUS BEACH — Digital Guest Guide & Experience

A modern, Aegean Riviera-inspired guest experience portal and media asset management system for **Orka Lotus Beach** (İçmeler, Marmaris, Türkiye).

---

## Highlights

- **Aegean Riviera Editorial Aesthetics**: Tailored typography, refined palettes, daylight and midnight modes, and multi-language support (English, Turkish, Spanish, German, Russian, French, Arabic, Farsi).
- **Interactive Daily Schedules & Discovery**: Real-time activity calendars, restaurant guides, wellness booking desks, and local attractions.
- **Media & Asset Management Desk**: Clean administrative upload and publishing workflows for resort photography and media assets.
- **100% Provider-Agnostic Architecture**: Fully decoupled core with pluggable adapters for Storage (Local / S3 / R2 / MinIO), Authentication (JWT / OAuth), Database (MySQL / Postgres / In-Memory), and AI (Gemini / OpenAI / Anthropic).
- **Zero Lock-In**: Deployable to Docker, VPS, Cloud Run, AWS, Vercel, or self-hosted servers with zero code changes.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Run in Development
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
npm start
```

---

## Docker Deployment

```bash
docker-compose up -d --build
```

---

## Deploy to Vercel

The repository is pre-configured for one-click Vercel deployment via `vercel.json`:

1. **Import the repository** into Vercel.
2. Vercel automatically detects the configuration from `vercel.json`:
   - **Framework Preset**: Vite
   - **Build Command**: `vite build`
   - **Output Directory**: `dist/public`
3. Click **Deploy**. The React Vite application and backend API routes will build and run with full single-page routing support.

---

## Documentation

For full architectural details and provider configuration, refer to [PORTABILITY_GUIDE.md](./PORTABILITY_GUIDE.md).
