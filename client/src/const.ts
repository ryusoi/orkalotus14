import { OAUTH_STATE_COOKIE, encodeOAuthState } from "@shared/const";

export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

/**
 * Universal login function:
 * If OAuth portal environment variables are set, triggers OAuth flow.
 * Otherwise, performs local instant sign-in.
 */
export const startLogin = async (redirectPath = window.location.pathname) => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;

  if (oauthPortalUrl && appId) {
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const nonce = crypto.randomUUID();
    document.cookie = `${OAUTH_STATE_COOKIE}=${nonce}; Path=/; Max-Age=600; SameSite=None; Secure`;
    const state = encodeOAuthState({ redirectUri, nonce });

    const url = new URL(`${oauthPortalUrl}/app-auth`);
    url.searchParams.set("appId", appId);
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", "signIn");

    window.location.href = url.toString();
    return;
  }

  // Standalone / Local Auth fallback
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@orkalotusbeach.com", name: "Hotel Administrator", role: "admin" }),
    });
    if (res.ok) {
      window.location.href = redirectPath;
    }
  } catch (error) {
    console.error("Local login failed:", error);
  }
};
