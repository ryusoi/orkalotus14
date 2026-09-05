import { GenerateTextOptions, GenerateTextResult, IAIService } from "./types";

export class MockAIProvider implements IAIService {
  async generateText(options: GenerateTextOptions): Promise<GenerateTextResult> {
    const lastUserMessage = [...options.messages].reverse().find((m) => m.role === "user");
    const prompt = lastUserMessage?.content || "";

    return {
      text: `[Mock AI Response for: "${prompt.slice(0, 50)}..."] Welcome to Orka Lotus Beach Guest Experience.`,
      model: "mock-model",
      usage: { promptTokens: 10, completionTokens: 15, totalTokens: 25 },
    };
  }
}
