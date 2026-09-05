import { generateText, GenerateTextOptions } from "../services/ai";

export type Role = "system" | "user" | "assistant" | "tool" | "function";

export type TextContent = {
  type: "text";
  text: string;
};

export type ImageContent = {
  type: "image_url";
  image_url: {
    url: string;
    detail?: "auto" | "low" | "high";
  };
};

export type FileContent = {
  type: "file_url";
  file_url: {
    url: string;
    mime_type?: string;
  };
};

export type MessageContent = string | TextContent | ImageContent | FileContent;

export type Message = {
  role: Role;
  content: MessageContent | MessageContent[];
  name?: string;
  tool_call_id?: string;
};

export type Tool = {
  type: "function";
  function: {
    name: string;
    description?: string;
    parameters?: Record<string, unknown>;
  };
};

export type InvokeParams = {
  messages: Message[];
  tools?: Tool[];
  toolChoice?: any;
  tool_choice?: any;
  maxTokens?: number;
  max_tokens?: number;
  outputSchema?: any;
  output_schema?: any;
  responseFormat?: any;
  response_format?: any;
  model?: string;
  thinking?: Record<string, unknown>;
  reasoning?: Record<string, unknown>;
};

export type InvokeResult = {
  id: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: Role;
      content: string;
    };
    finish_reason: string | null;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

function extractMessageString(content: MessageContent | MessageContent[]): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((c) => {
        if (typeof c === "string") return c;
        if (c.type === "text") return c.text;
        return "";
      })
      .join("\n");
  }
  if (content.type === "text") return content.text;
  return "";
}

export async function invokeLLM(params: InvokeParams): Promise<InvokeResult> {
  const messages = params.messages.map((m) => ({
    role: m.role,
    content: extractMessageString(m.content),
    name: m.name,
  }));

  const result = await generateText({
    messages,
    model: params.model,
    maxTokens: params.max_tokens ?? params.maxTokens,
  });

  return {
    id: `chatcmpl-${Date.now()}`,
    created: Math.floor(Date.now() / 1000),
    model: result.model,
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: result.text,
        },
        finish_reason: "stop",
      },
    ],
    usage: result.usage
      ? {
          prompt_tokens: result.usage.promptTokens,
          completion_tokens: result.usage.completionTokens,
          total_tokens: result.usage.totalTokens,
        }
      : undefined,
  };
}

export async function listLLMModels() {
  return {
    object: "list",
    data: [
      { id: "gpt-4o-mini", object: "model", created: Date.now(), owned_by: "openai" },
      { id: "gemini-2.5-flash", object: "model", created: Date.now(), owned_by: "google" },
    ],
  };
}
