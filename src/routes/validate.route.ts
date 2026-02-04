import { FastifyInstance } from "fastify";
import fs from "fs";
import path from "path";
import { classifyMessage } from "../services/classifier.service";

type Conversation = {
  id: number;
  message: string;
  expected_category: string;
};

export async function validateRoute(app: FastifyInstance) {
  app.post("/validate", async () => {
    const filePath = path.join(
      __dirname,
      "..",
      "data",
      "conversas-exemplo.json"
    );

    const file = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(file);

    const conversations: Conversation[] = data.conversations;

    let correct = 0;
    const errors: any[] = [];

    const stats: Record<
      string,
      { total: number; correct: number }
    > = {};

    for (const convo of conversations) {
      const predicted = await classifyMessage(convo.message);

      stats[convo.expected_category] ??= {
        total: 0,
        correct: 0,
      };

      stats[convo.expected_category].total++;

      if (predicted === convo.expected_category) {
        correct++;
        stats[convo.expected_category].correct++;
      } else {
        errors.push({
          id: convo.id,
          expected: convo.expected_category,
          predicted,
        });
      }
    }

    const total = conversations.length;
    const accuracy = Number((correct / total).toFixed(2));

    const byCategory = Object.fromEntries(
      Object.entries(stats).map(([category, s]) => [
        category,
        Number((s.correct / s.total).toFixed(2)),
      ])
    );

    return {
      total,
      correct,
      accuracy,
      byCategory,
      errors,
    };
  });
}
