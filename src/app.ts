import fastify from 'fastify'
import { classifyRoute } from "./routes/classify.route";
import { validateRoute } from './routes/validate.route';
import "dotenv/config"; 



export const app = fastify()
app.register(classifyRoute);
app.register(validateRoute);


