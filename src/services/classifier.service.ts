import { CLASSIFY_PROMPT } from "../prompt/classify.prompt";
import { createLLMProvider } from "../llm/llm.factory";
import { IntentCategory } from "../llm/llm.interface";

export async function classifyMessage(
  message: string
): Promise<IntentCategory> {
  const llm = createLLMProvider(); // 👈 cria DEPOIS do dotenv
  const prompt = CLASSIFY_PROMPT.replace("{message}", message);
  return llm.classify(prompt);
}
