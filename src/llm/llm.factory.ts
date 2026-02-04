import { LLMProvider } from "./llm.interface";
import { OpenAIProvider } from "./openai.provider";
import { GeminiProvider } from "./gemini.provider";

export function createLLMProvider(): LLMProvider {
  const provider = process.env.LLM_PROVIDER ?? "openai";

  if (provider === "gemini") {
    return new GeminiProvider();
  }

  return new OpenAIProvider();
}
