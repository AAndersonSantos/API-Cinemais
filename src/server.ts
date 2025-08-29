import Fastify from "fastify";
import mediaRoutes from "./routes/media.routes";
import { connectDB } from "./db";

const app = Fastify({ logger: true });

app.get("/", async () => ({ message: "Hello Fastify 🚀" }));

app.register(mediaRoutes);

const start = async () => {
  try {
    await connectDB();
    await app.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Servidor rodando em http://localhost:3000");
    
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
