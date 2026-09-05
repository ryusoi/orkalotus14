import { config } from "../../config";
import { GeminiProvider } from "./geminiProvider";
import { MockAIProvider } from "./mockProvider";
import { OpenAIProvider } from "./openaiProvider";
import { GenerateTextOptions, GenerateTextResult, IAIService } from "./types";

let aiInstance: IAIService | null = null;

export function getAIService(): IAIService {
  if (aiInstance) return aiInstance;

  const geminiKey = config.geminiApiKey || process.env.GEMINI_API_KEY;
  const openAiKey = config.openaiApiKey;

  if (config.aiProvider === "gemini" && geminiKey) {
    aiInstance = new GeminiProvider(geminiKey);
  } else if (config.aiProvider === "openai" && openAiKey) {
    aiInstance = new OpenAIProvider(openAiKey, config.openaiBaseUrl);
  } else if (geminiKey) {
    aiInstance = new GeminiProvider(geminiKey);
  } else if (openAiKey) {
    aiInstance = new OpenAIProvider(openAiKey, config.openaiBaseUrl);
  } else {
    aiInstance = new MockAIProvider();
  }

  return aiInstance;
}

export async function generateText(options: GenerateTextOptions): Promise<GenerateTextResult> {
  const service = getAIService();
  return service.generateText(options);
}

export * from "./types";
