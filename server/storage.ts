/**
 * Provider-Agnostic Storage Service
 *
 * Supports:
 * - Local Disk Storage (default, completely standalone)
 * - S3-Compatible Object Storage (AWS S3, Cloudflare R2, MinIO, GCP Storage XML, Supabase)
 * - In-Memory / Base64 Data URL fallback
 */
export {
  getStorageService,
  registerStorageRoutes,
  storageGet,
  storageGetSignedUrl,
  storagePut,
} from "./services/storage";

export type {
  IStorageService,
  StorageGetResult,
  StoragePutOptions,
  StoragePutResult,
} from "./services/storage/types";
