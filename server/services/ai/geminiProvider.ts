import { GoogleGenAI } from "@google/genai";
import { GenerateTextOptions, GenerateTextResult, IAIService } from "./types";

export class GeminiProvider implements IAIService {
  private ai: GoogleGenAI;
  private defaultModel: string;

  constructor(apiKey: string, defaultModel = "gemini-3.8-flash") {
    this.defaultModel = defaultModel;
    this.ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  async generateText(options: GenerateTextOptions): Promise<GenerateTextResult> {
    const model = options.model || this.defaultModel;

    // Convert messages to contents
    const contents = options.messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    try {
      const response = await this.ai.models.generateContent({
        model,
        contents,
        config: {
          temperature: options.temperature,
          maxOutputTokens: options.maxTokens,
          responseMimeType: options.responseFormat?.type === "json_object" ? "application/json" : undefined,
        },
      });

      const text = response.text || "";

      return {
        text,
        model,
        usage: response.usageMetadata
          ? {
              promptTokens: response.usageMetadata.promptTokenCount || 0,
              completionTokens: response.usageMetadata.candidatesTokenCount || 0,
              totalTokens: response.usageMetadata.totalTokenCount || 0,
            }
          : undefined,
      };
    } catch (error: any) {
      console.error("[Google GenAI] Generation failed:", error);
      throw new Error(`Google GenAI API error: ${error?.message || String(error)}`);
    }
  }
}
