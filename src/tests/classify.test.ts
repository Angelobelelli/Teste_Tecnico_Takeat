import { describe, it, expect, vi } from "vitest";
import Fastify from "fastify";
import { classifyRoute } from "../routes/classify.route";

vi.mock("../services/classifier.service", () => {
  return {
    classifyMessage: vi.fn(async () => "PEDIDO_CARDAPIO"),
  };
});

describe("POST /classify", () => {
  it("should classify menu question", async () => {
    const app = Fastify();
    app.register(classifyRoute);

    const response = await app.inject({
      method: "POST",
      url: "/classify",
      payload: {
        message: "Tem opção vegetariana no menu? Minha esposa não come carne",
      },
    });

    const body = response.json();

    expect(response.statusCode).toBe(200);
    expect(body.category).toBe("PEDIDO_CARDAPIO");
    expect(body.confidence).toBeGreaterThan(0);
  });
});
