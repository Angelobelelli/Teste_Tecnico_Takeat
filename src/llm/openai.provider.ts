import OpenAI from "openai";
import { LLMProvider, IntentCategory } from "./llm.interface";

const VALID_CATEGORIES: IntentCategory[] = [
  "PEDIDO_CARDAPIO",
  "STATUS_ENTREGA",
  "RECLAMACAO",
  "ELOGIO",
  "OUTROS",
];

export class OpenAIProvider implements LLMProvider {
  private client: OpenAI;

  constructor() {
    if (!process.env.LLM_API_KEY || !process.env.LLM_MODEL) {
      throw new Error("LLM_API_KEY or LLM_MODEL not defined");
    }

    this.client = new OpenAI({
      apiKey: process.env.LLM_API_KEY,
      baseURL: process.env.LLM_BASE_URL,
    });
  }

  async classify(prompt: string): Promise<IntentCategory> {
    const response = await this.client.chat.completions.create({
      model: process.env.LLM_MODEL!,
      messages: [
        {
          role: "system",
          content:
            "You are an intent classifier. Reply with ONLY one category.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0,
      
    });

    const text = response.choices[0]?.message?.content?.trim();

    if (VALID_CATEGORIES.includes(text as IntentCategory)) {
      return text as IntentCategory;
    }

    return "OUTROS";
  }
}
