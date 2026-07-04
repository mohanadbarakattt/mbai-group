import { GoogleGenAI, Type } from "@google/genai";
import { TranslationResult } from "../types";

const SYSTEM_INSTRUCTION = `
You are an expert linguist specializing in Franco-Arabic, specifically the Egyptian dialect.
Your task is to translate user input from Franco into natural English and also provide the Egyptian Arabic script equivalent.

RULES FOR TRANSLATION:
- Franco uses Latin letters and numbers:
  * 2 = Hamza (ء) or Alef (أ)
  * 3 = 3een (ع)
  * 3' = Gheen (غ)
  * 5 = Khah (خ)
  * 7 = 7ah (ح)
  * 6 = Tah (ط)
  * 9 = Saad (ص)
  * 9' = Daad (ض)
  * 8 = Qaf (ق) - though 2 is often used in Cairo
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

export const translateFranco = async (input: string): Promise<TranslationResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

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
      console.error("Translation error:", error);
      throw new Error("Failed to connect to the translation engine.");
    }
  };

  return attempt(2);
};
