export interface StoragePutOptions {
  contentType?: string;
  isPublic?: boolean;
}

export interface StoragePutResult {
  key: string;
  url: string;
}

export interface StorageGetResult {
  key: string;
  url: string;
}

export interface IStorageService {
  put(
    key: string,
    data: Buffer | Uint8Array | string,
    options?: StoragePutOptions
  ): Promise<StoragePutResult>;
  
  get(key: string): Promise<StorageGetResult>;
  
  getSignedUrl(key: string, expiresInSeconds?: number): Promise<string>;
  
  delete(key: string): Promise<void>;
}
