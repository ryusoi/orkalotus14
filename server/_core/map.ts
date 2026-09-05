/**
 * Provider-Agnostic Google Maps Web Services Client
 */

export interface RequestOptions {
  method?: "GET" | "POST";
  body?: Record<string, unknown>;
}

export async function makeRequest<T = unknown>(
  endpoint: string,
  params: Record<string, unknown> = {},
  options: RequestOptions = {}
): Promise<T> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || "";
  const baseUrl = "https://maps.googleapis.com";

  const url = new URL(`${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`);
  if (apiKey) {
    url.searchParams.append("key", apiKey);
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  const response = await fetch(url.toString(), {
    method: options.method || "GET",
    headers: { "Content-Type": "application/json" },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Maps API error (${response.status}): ${errorText}`);
  }

  return (await response.json()) as T;
}
