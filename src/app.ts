import fastify from 'fastify'
import { classifyRoute } from "./routes/classify.route";
import "dotenv/config"; // 👈 carrega automaticamente
import { validateRoute } from './routes/validate.route';




export const app = fastify()
app.register(classifyRoute);
app.register(validateRoute);


