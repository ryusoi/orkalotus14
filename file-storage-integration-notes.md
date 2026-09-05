# ORKA LOTUS BEACH full-stack and file-storage integration

## What changed

The project now uses the managed full-stack scaffold already present in the workspace: Express, tRPC, authenticated Manus sessions, Drizzle and the preconfigured storage helpers in `server/storage.ts`.

A `guestAssets` table stores asset metadata while the binary file is uploaded through `storagePut` to managed object storage. The database keeps the storage key, proxy URL, original filename, MIME type, size, optional editorial label, creator ID and an explicit `published` flag.

## API contract

`assets.upload` is administrator-only. It accepts JPG, PNG, WEBP and GIF images up to 8 MB, validates the decoded byte length, sanitizes the object name, uploads through managed storage and persists the metadata. `assets.list` is administrator-only and powers the content desk. `assets.published` is public and returns only assets explicitly approved for guest-facing use.

## Guest experience integration

The `/assets` route provides an administrator-only content desk with upload, label and publish controls, plus a gallery of stored assets served through the `/manus-storage/...` proxy. The guest-facing home page queries only published assets and uses the first approved asset as a hero override; if none is published, the existing ORKA LOTUS BEACH hero image remains the fallback. A subtle Content desk link is available in the footer for staff.

## Security and operations

Guests cannot list or upload assets because the write and private-list procedures use `adminProcedure`. Public delivery is limited to records marked `published`. To use the workflow, sign in with the hotel administrator account, visit `/assets`, choose an approved image, add an editorial label, select the publication checkbox when appropriate, and upload it. The next guest-guide load will use the published image without changing the codebase.

## Verification

The server Vitest suite passes with 3 tests, TypeScript checking passes, the production build passes, the guest home page renders at desktop and mobile widths, and the repaired managed-preview HMR path no longer injects the failing `/@vite/client` WebSocket bootstrap.

## Centralized media model

The guest media contract now lives in `client/src/data/content.ts` as `guestMedia`. The home page selects the first record returned by `assets.published` and falls back to `guestMedia.heroFallback`, keeping the storage-backed override and the original approved image in one explicit content path.
