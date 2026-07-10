import { GoogleGenAI, Type } from "@google/genai";
import { TranslationResult } from "../types";

const SYSTEM_INSTRUCTION = `
You are an expert linguist specializing in Franco-Arabic, specifically the Egyptian dialect.
Your task is to translate user input from Franco into natural English and also provide the Egyptian Arabic script equivalent.

RULES FOR TRANSLATION (Egyptian/Cairene Franco only — numbers are used ONLY for
sounds with no Latin letter; everything else collapses onto plain Latin spelling):
  * 2 = Hamza (ء), Alef (أ), AND a silent Qaf (ق) — silent-Qaf is the default for
    ~90% of everyday Cairo words (e.g. "delwa2ty" for دلوقتي). A small minority of
    formal/religious/loan words keep a pronounced Qaf, written "q" or "k" (e.g.
    "2awmy" is the common form even then) — when unsure, default to silent/2.
  * 3 = 3een (ع)
  * 5 = Khah (خ)
  * 7 = 7ah (ح)
  * gh = Gheen (غ) — e.g. "ghaly" (expensive). "3'" is a rarer alternate spelling;
    prefer plain "gh" as the primary form.
  * Tah (ط) and Teh (ت) both collapse to plain "T" (e.g. "tayeb").
  * Theh (ث), Seen (س), and Saad (ص) all collapse to plain "S" (e.g. "sa7").
  * Zaal (ذ), Zeen (ز), and Zah (ظ) all collapse to plain "Z".
  * Geem (ج) is a hard "g" in Egyptian Franco (like English "go"), never "j".
  * There is no "9", "6", "8", or "9'" in real Egyptian Franco — don't invent them.
- Minimal spelling wins: use the fewest letters that still sound right, exactly how
  a native Cairo speaker would type a WhatsApp message, not a phonetic transliteration.
- Handle Egyptian colloquialisms (e.g., "ezayek", "basha", "enta fen", "ya rayek").
- Translate into modern, conversational English.
- Always return the response in a JSON format.

Input example: "ezayak ya basha, 3amel eh el naharda?"
Output example: {
  "english": "How are you boss? How are you doing today?",
  "arabicScript": "إزيك يا باشا، عامل إيه النهاردة؟",
  "explanation": "ezayak is 'how are you', basha is 'boss/sir', 3amel eh is 'how are you doing'."
}
`;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class RateLimitError extends Error {
  constructor() {
    super("Rate limit reached. Please wait a moment and try again.");
    this.name = "RateLimitError";
  }
}

/** Thrown when the Gemini API key is missing/invalid — a config problem, not a user error. */
export class ConfigError extends Error {
  constructor() {
    super("The translator isn't configured correctly right now.");
    this.name = "ConfigError";
  }
}

const RAW_API_KEY = process.env.API_KEY || '';
const PLACEHOLDER_KEYS = new Set(['', 'PLACEHOLDER_API_KEY', 'YOUR_API_KEY', 'undefined']);

const looksLikeInvalidKeyError = (error: any): boolean => {
  const message: string = String(error?.message ?? error?.response?.data?.error?.message ?? '');
  const reason: string = String(error?.response?.data?.error?.status ?? error?.status ?? '');
  return (
    /api key not valid/i.test(message) ||
    /api_key_invalid/i.test(message) ||
    /api_key_invalid/i.test(reason)
  );
};

export const translateFranco = async (input: string): Promise<TranslationResult> => {
  // Fail fast and friendly if the key was never configured — no point round-tripping
  // to Google just to surface a confusing error to the end user.
  if (PLACEHOLDER_KEYS.has(RAW_API_KEY.trim())) {
    throw new ConfigError();
  }

  const ai = new GoogleGenAI({ apiKey: RAW_API_KEY });

  const attempt = async (retryCount: number): Promise<TranslationResult> => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Translate this Franco-Egyptian text: "${input}"`,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              english: { type: Type.STRING },
              arabicScript: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ["english", "arabicScript"]
          }
        }
      });

      const result = JSON.parse(response.text || '{}');
      return {
        english: result.english || "Could not translate",
        arabicScript: result.arabicScript || "لم يتم العثور على نص",
        explanation: result.explanation
      };
    } catch (error: any) {
      const status = error?.status ?? error?.response?.status;
      if (status === 429) {
        if (retryCount > 0) {
          await sleep(2000);
          return attempt(retryCount - 1);
        }
        throw new RateLimitError();
      }
      if (looksLikeInvalidKeyError(error)) {
        console.error("Translation error: invalid/misconfigured Gemini API key.", error);
        throw new ConfigError();
      }
      console.error("Translation error:", error);
      throw new Error("Failed to connect to the translation engine.");
    }
  };

  return attempt(2);
};
