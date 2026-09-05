export type Role = "system" | "user" | "assistant" | "tool" | "function";

export type Message = {
  role: Role;
  content: string;
  name?: string;
};

export type GenerateTextOptions = {
  messages: Message[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  responseFormat?: { type: "text" | "json_object" };
};

export type GenerateTextResult = {
  text: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
};

export interface IAIService {
  generateText(options: GenerateTextOptions): Promise<GenerateTextResult>;
}
