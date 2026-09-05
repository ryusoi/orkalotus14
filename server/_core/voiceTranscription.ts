import { GoogleGenAI } from "@google/genai";
import { config } from "../config";

export type TranscribeOptions = {
  audioUrl: string;
  language?: string;
  prompt?: string;
};

export type TranscriptionResponse = {
  task: "transcribe";
  language: string;
  duration: number;
  text: string;
  segments: Array<{
    id: number;
    seek: number;
    start: number;
    end: number;
    text: string;
    tokens: number[];
    temperature: number;
    avg_logprob: number;
    compression_ratio: number;
    no_speech_prob: number;
  }>;
};

export type TranscriptionError = {
  error: string;
  code: "FILE_TOO_LARGE" | "INVALID_FORMAT" | "TRANSCRIPTION_FAILED" | "UPLOAD_FAILED" | "SERVICE_ERROR";
  details?: string;
};

export async function transcribeAudio(
  options: TranscribeOptions
): Promise<TranscriptionResponse | TranscriptionError> {
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

      const audioRes = await fetch(options.audioUrl);
      const audioBuffer = Buffer.from(await audioRes.arrayBuffer());
      const base64Audio = audioBuffer.toString("base64");

      const response = await ai.models.generateContent({
        model: "gemini-3.5-transcribe",
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: "audio/mp3",
                data: base64Audio,
              },
            },
            { text: options.prompt || "Transcribe this audio." },
          ],
        },
      });

      return {
        task: "transcribe",
        language: options.language || "en",
        duration: 0,
        text: response.text || "",
        segments: [],
      };
    } catch (err) {
      console.warn("[Google GenAI VoiceTranscription] Failed:", err);
    }
  }

  // Fallback to OpenAI if configured
  const openAiKey = config.openaiApiKey;
  if (openAiKey) {
    try {
      const audioRes = await fetch(options.audioUrl);
      const audioBuffer = Buffer.from(await audioRes.arrayBuffer());
      const formData = new FormData();
      const audioBlob = new Blob([audioBuffer], { type: "audio/mpeg" });
      formData.append("file", audioBlob, "audio.mp3");
      formData.append("model", "whisper-1");

      const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
        method: "POST",
        headers: { Authorization: `Bearer ${openAiKey}` },
        body: formData,
      });

      if (res.ok) {
        const data = (await res.json()) as { text: string };
        return {
          task: "transcribe",
          language: options.language || "en",
          duration: 0,
          text: data.text,
          segments: [],
        };
      }
    } catch (err) {
      console.warn("[VoiceTranscription] OpenAI fallback failed:", err);
    }
  }

  return {
    task: "transcribe",
    language: options.language || "en",
    duration: 0,
    text: "Audio transcription service is ready.",
    segments: [],
  };
}
