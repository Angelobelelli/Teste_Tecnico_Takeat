import { IntentCategory } from "../llm/llm.interface";

export function getConfidence(category: IntentCategory): number {
  if (category === "OUTROS") return 0.6;
  return 0.9;
}
