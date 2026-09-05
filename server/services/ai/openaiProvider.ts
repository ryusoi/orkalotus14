import { GenerateTextOptions, GenerateTextResult, IAIService } from "./types";

export class OpenAIProvider implements IAIService {
  private apiKey: string;
  private baseUrl: string;
  private defaultModel: string;

  constructor(apiKey: string, baseUrl = "https://api.openai.com/v1", defaultModel = "gpt-4o-mini") {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl.replace(/\/+$/, "");
    this.defaultModel = defaultModel;
  }

  async generateText(options: GenerateTextOptions): Promise<GenerateTextResult> {
    const model = options.model || this.defaultModel;
    const url = `${this.baseUrl}/chat/completions`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: options.messages,
        temperature: options.temperature,
        max_tokens: options.maxTokens,
        response_format: options.responseFormat,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
    }

    const data = (await response.json()) as {
      choices: Array<{ message: { content: string } }>;
      model: string;
      usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
    };

    return {
      text: data.choices?.[0]?.message?.content || "",
      model: data.model || model,
      usage: data.usage
        ? {
            promptTokens: data.usage.prompt_tokens,
            completionTokens: data.usage.completion_tokens,
            totalTokens: data.usage.total_tokens,
          }
        : undefined,
    };
  }
}
