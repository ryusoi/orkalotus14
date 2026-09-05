import { describe, expect, it } from "vitest";

describe("configured Orka Lotus branding endpoint", () => {
  it("responds to a lightweight request for the exact supplied logo", async () => {
    const logoUrl = "https://raw.githubusercontent.com/ryusoi/orkalotusmanus1/main/LOGO/orka%20only%20inside%20logo.png";
    const response = await fetch(logoUrl, { method: "HEAD" });
    expect(response.status).toBeLessThan(500);
  }, 15_000);
});
