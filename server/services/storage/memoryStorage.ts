import { IStorageService, StorageGetResult, StoragePutOptions, StoragePutResult } from "./types";

export class MemoryStorageService implements IStorageService {
  private store = new Map<string, { data: Buffer; contentType: string }>();

  private normalizeKey(key: string): string {
    return key.replace(/^\/+/, "").replace(/\\/g, "/");
  }

  async put(
    relKey: string,
    data: Buffer | Uint8Array | string,
    options?: StoragePutOptions
  ): Promise<StoragePutResult> {
    const key = this.normalizeKey(relKey);
    const buffer = typeof data === "string" ? Buffer.from(data) : Buffer.from(data);
    const contentType = options?.contentType || "application/octet-stream";
    
    this.store.set(key, { data: buffer, contentType });
    const base64 = buffer.toString("base64");
    const url = `data:${contentType};base64,${base64}`;

    return { key, url };
  }

  async get(relKey: string): Promise<StorageGetResult> {
    const key = this.normalizeKey(relKey);
    const item = this.store.get(key);
    if (!item) {
      return { key, url: "" };
    }
    const url = `data:${item.contentType};base64,${item.data.toString("base64")}`;
    return { key, url };
  }

  async getSignedUrl(relKey: string): Promise<string> {
    const res = await this.get(relKey);
    return res.url;
  }

  async delete(relKey: string): Promise<void> {
    const key = this.normalizeKey(relKey);
    this.store.delete(key);
  }
}
