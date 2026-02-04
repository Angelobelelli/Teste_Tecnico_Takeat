import { GoogleGenAI } from "@google/genai";
import { LLMProvider, IntentCategory } from "./llm.interface";

const VALID_CATEGORIES: IntentCategory[] = [
  "PEDIDO_CARDAPIO",
  "STATUS_ENTREGA",
  "RECLAMACAO",
  "ELOGIO",
  "OUTROS",
];

export class GeminiProvider implements LLMProvider {
  private ai: GoogleGenAI;

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not defined");
    }

    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  async classify(prompt: string): Promise<IntentCategory> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      
    });

    const text =
      response.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      console.log("LLM RAW RESPONSE:", text);


    if (VALID_CATEGORIES.includes(text as IntentCategory)) {
      return text as IntentCategory;
    }

    return "OUTROS";
  }
}
