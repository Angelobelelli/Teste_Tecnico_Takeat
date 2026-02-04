import { FastifyInstance } from "fastify";
import { classifyMessage } from "../services/classifier.service";
import { getConfidence } from "../utils/confidence";

export async function classifyRoute(app: FastifyInstance) {
  app.post("/classify", async (request, reply) => {
    const body = request.body as {
      message?: string;
      messages?: string[];
    };

    let finalMessage = "";

    if (body.messages && Array.isArray(body.messages)) {
      finalMessage = body.messages.join(" ");
    } else if (body.message) {
      finalMessage = body.message;
    } else {
      return reply.status(400).send({
        error: "message or messages is required",
      });
    }

    const category = await classifyMessage(finalMessage);

    return {
      category,
      confidence: getConfidence(category),
    };
  });
}
