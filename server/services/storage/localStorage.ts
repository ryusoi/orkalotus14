import fs from "fs";
import path from "path";
import { IStorageService, StorageGetResult, StoragePutOptions, StoragePutResult } from "./types";

export class LocalStorageService implements IStorageService {
  private baseDir: string;
  private urlPrefix: string;

  constructor(baseDir = "uploads", urlPrefix = "/api/storage") {
    this.baseDir = path.resolve(process.cwd(), baseDir);
    this.urlPrefix = urlPrefix;
    this.ensureDir(this.baseDir);
  }

  private ensureDir(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  private normalizeKey(key: string): string {
    return key.replace(/^\/+/, "").replace(/\\/g, "/");
  }

  private getFilePath(key: string): string {
    const safeKey = this.normalizeKey(key);
    return path.join(this.baseDir, safeKey);
  }

  async put(
    relKey: string,
    data: Buffer | Uint8Array | string,
    _options?: StoragePutOptions
  ): Promise<StoragePutResult> {
    const key = this.normalizeKey(relKey);
    const filePath = this.getFilePath(key);
    this.ensureDir(path.dirname(filePath));

    const buffer = typeof data === "string" ? Buffer.from(data) : Buffer.from(data);
    await fs.promises.writeFile(filePath, buffer);

    const url = `${this.urlPrefix}/${key}`;
    return { key, url };
  }

  async get(relKey: string): Promise<StorageGetResult> {
    const key = this.normalizeKey(relKey);
    const url = `${this.urlPrefix}/${key}`;
    return { key, url };
  }

  async getSignedUrl(relKey: string): Promise<string> {
    const key = this.normalizeKey(relKey);
    return `${this.urlPrefix}/${key}`;
  }

  async delete(relKey: string): Promise<void> {
    const key = this.normalizeKey(relKey);
    const filePath = this.getFilePath(key);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  }

  getRootDir(): string {
    return this.baseDir;
  }
}
