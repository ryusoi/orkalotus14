import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { IStorageService, StorageGetResult, StoragePutOptions, StoragePutResult } from "./types";

export interface S3StorageConfig {
  bucket: string;
  region: string;
  endpoint?: string;
  accessKeyId: string;
  secretAccessKey: string;
  publicUrlPrefix?: string;
}

export class S3StorageService implements IStorageService {
  private client: S3Client;
  private bucket: string;
  private publicUrlPrefix?: string;

  constructor(config: S3StorageConfig) {
    this.bucket = config.bucket;
    this.publicUrlPrefix = config.publicUrlPrefix;
    this.client = new S3Client({
      region: config.region,
      endpoint: config.endpoint,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      forcePathStyle: Boolean(config.endpoint), // Useful for MinIO / LocalStack
    });
  }

  private normalizeKey(key: string): string {
    return key.replace(/^\/+/, "").replace(/\\/g, "/");
  }

  async put(
    relKey: string,
    data: Buffer | Uint8Array | string,
    options?: StoragePutOptions
  ): Promise<StoragePutResult> {
    const key = this.normalizeKey(relKey);
    const body = typeof data === "string" ? Buffer.from(data) : Buffer.from(data);

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: body,
        ContentType: options?.contentType || "application/octet-stream",
      })
    );

    let url: string;
    if (this.publicUrlPrefix) {
      url = `${this.publicUrlPrefix.replace(/\/+$/, "")}/${key}`;
    } else {
      url = await this.getSignedUrl(key, 86400); // 24hr default signed URL
    }

    return { key, url };
  }

  async get(relKey: string): Promise<StorageGetResult> {
    const key = this.normalizeKey(relKey);
    const url = await this.getSignedUrl(key);
    return { key, url };
  }

  async getSignedUrl(relKey: string, expiresInSeconds = 3600): Promise<string> {
    const key = this.normalizeKey(relKey);
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });
    return getSignedUrl(this.client, command, { expiresIn: expiresInSeconds });
  }

  async delete(relKey: string): Promise<void> {
    const key = this.normalizeKey(relKey);
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      })
    );
  }
}
