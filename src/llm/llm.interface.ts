export type IntentCategory =
  | "PEDIDO_CARDAPIO"
  | "STATUS_ENTREGA"
  | "RECLAMACAO"
  | "ELOGIO"
  | "OUTROS";

export interface LLMProvider {
  classify(prompt: string): Promise<IntentCategory>;
}
