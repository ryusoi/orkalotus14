import type { Express } from "express";
import fs from "fs";
import path from "path";
import { config } from "../../config";
import { LocalStorageService } from "./localStorage";
import { MemoryStorageService } from "./memoryStorage";
import { S3StorageService } from "./s3Storage";
import { IStorageService, StoragePutOptions, StoragePutResult } from "./types";

let storageInstance: IStorageService | null = null;
let localStorageInstance: LocalStorageService | null = null;

export function getStorageService(): IStorageService {
  if (storageInstance) return storageInstance;

  if (config.storageProvider === "s3" && config.s3Config) {
    storageInstance = new S3StorageService(config.s3Config);
  } else if (config.storageProvider === "memory") {
    storageInstance = new MemoryStorageService();
  } else {
    localStorageInstance = new LocalStorageService(config.storageLocalDir, "/api/storage");
    storageInstance = localStorageInstance;
  }

  return storageInstance;
}

export function registerStorageRoutes(app: Express) {
  const service = getStorageService();

  // Route 1: Standard decoupled storage endpoint /api/storage/*
  app.get("/api/storage/*", (req, res) => {
    const key = (req.params as Record<string, string>)[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }

    const uploadDir = path.resolve(process.cwd(), config.storageLocalDir);
    const filePath = path.join(uploadDir, key);

    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
      return;
    }

    // Check client/public fallbacks for video/audio assets
    const publicDir = path.resolve(process.cwd(), "client/public");
    const publicFallback = path.join(publicDir, key);
    if (fs.existsSync(publicFallback)) {
      res.sendFile(publicFallback);
      return;
    }

    res.status(404).send("File not found");
  });

  // Route 2: Backward-compatibility proxy for legacy /manus-storage/* paths
  // Redirects or serves the local video/audio/image assets seamlessly
  app.get("/manus-storage/*", (req, res) => {
    const key = (req.params as Record<string, string>)[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }

    // Check if the file exists in uploads
    const uploadDir = path.resolve(process.cwd(), config.storageLocalDir);
    const filePath = path.join(uploadDir, key);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
      return;
    }

    // Smart fallback for media assets
    const lower = key.toLowerCase();
    if (lower.includes("intro") || lower.includes("orka-lotus-hero")) {
      res.redirect(302, "/videos/Intro.mp4");
      return;
    }
    if (lower.includes("end")) {
      res.redirect(302, "/videos/end.mp4");
      return;
    }
    if (lower.includes("summer") || lower.includes("audio")) {
      res.redirect(302, "/audio/orka-lotus-summer.m4a");
      return;
    }
    if (lower.includes("mark") || lower.includes("logo")) {
      res.redirect(302, "/videos/hero-first-frame.jpg");
      return;
    }

    // Default media fallback
    res.redirect(302, "/videos/Intro.mp4");
  });
}

// Convenient top-level functions matching application conventions
export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream"
): Promise<StoragePutResult> {
  const service = getStorageService();
  return service.put(relKey, data, { contentType });
}

export async function storageGet(relKey: string) {
  const service = getStorageService();
  return service.get(relKey);
}

export async function storageGetSignedUrl(relKey: string, expiresInSeconds?: number) {
  const service = getStorageService();
  return service.getSignedUrl(relKey, expiresInSeconds);
}
