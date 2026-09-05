import { GoogleGenAI } from "@google/genai";
import { config } from "../config";
import { storagePut } from "../storage";

export type GenerateImageOptions = {
  prompt: string;
  originalImages?: Array<{
    url?: string;
    b64Json?: string;
    mimeType?: string;
  }>;
  model?: string;
  quality?: string;
};

export type GenerateImageResponse = {
  url?: string;
};

export async function generateImage(options: GenerateImageOptions): Promise<GenerateImageResponse> {
  const geminiKey = config.geminiApiKey || process.env.GEMINI_API_KEY;

  if (geminiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey: geminiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const response = await ai.models.generateContent({
        model: options.model || "gemini-3.1-flash-lite-image",
        contents: {
          parts: [{ text: options.prompt }],
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData?.data) {
          const base64Data = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || "image/png";
          const buffer = Buffer.from(base64Data, "base64");
          const uploaded = await storagePut(`generated/${Date.now()}.png`, buffer, mimeType);
          return { url: uploaded.url };
        }
      }
    } catch (err) {
      console.warn("[Google GenAI ImageGeneration] Failed:", err);
    }
  }

  // Fallback to OpenAI if configured
  const openAiKey = config.openaiApiKey;
  if (openAiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          prompt: options.prompt,
          n: 1,
          size: "1024x1024",
          response_format: "b64_json",
        }),
      });

      if (res.ok) {
        const data = (await res.json()) as { data: Array<{ b64_json: string }> };
        const b64 = data.data?.[0]?.b64_json;
        if (b64) {
          const buffer = Buffer.from(b64, "base64");
          const uploaded = await storagePut(`generated/${Date.now()}.png`, buffer, "image/png");
          return { url: uploaded.url };
        }
      }
    } catch (err) {
      console.warn("[ImageGeneration] OpenAI fallback failed:", err);
    }
  }

  return { url: "/videos/hero-first-frame.jpg" };
}

export async function listImageModels() {
  return {
    models: [
      { id: "gemini-3.1-flash-lite-image", model: "gemini-3.1-flash-lite-image" },
      { id: "gemini-3.1-flash-image", model: "gemini-3.1-flash-image" },
      { id: "dall-e-3", model: "dall-e-3" },
    ],
  };
}
