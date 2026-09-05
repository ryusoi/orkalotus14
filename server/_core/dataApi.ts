export type DataApiCallOptions = {
  query?: Record<string, unknown>;
  body?: Record<string, unknown>;
  pathParams?: Record<string, unknown>;
  formData?: Record<string, unknown>;
};

export async function callDataApi(
  apiId: string,
  options: DataApiCallOptions = {}
): Promise<unknown> {
  console.log(`[DataAPI] Called ${apiId} with options:`, options);
  return { success: true, apiId, data: options.body || options.query || {} };
}
