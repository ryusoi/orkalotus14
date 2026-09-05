import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type TestUser = NonNullable<TrpcContext["user"]>;

function createContext(role: TestUser["role"]): TrpcContext {
  const user: TestUser = {
    id: 42,
    openId: "asset-test-user",
    email: "asset@example.com",
    name: "Asset Tester",
    loginMethod: "test",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("assets procedures", () => {
  it("rejects uploads from non-admin users", async () => {
    const caller = appRouter.createCaller(createContext("user"));

    await expect(caller.assets.upload({
      fileName: "beach.jpg",
      contentType: "image/jpeg",
      sizeBytes: 3,
      dataBase64: "YWJj",
    })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("rejects unsupported file types before storage is called", async () => {
    const caller = appRouter.createCaller(createContext("admin"));

    await expect(caller.assets.upload({
      fileName: "notes.txt",
      contentType: "text/plain",
      sizeBytes: 3,
      dataBase64: "YWJj",
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
