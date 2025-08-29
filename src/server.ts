import Fastify from "fastify";
import { MongoClient } from "mongodb";

const app = Fastify({ logger: true });

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/cinemais";
let db: any;

app.get("/", async () => {
  return { message: "Hello Fastify 🚀" };
});

const start = async () => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    db = client.db();
    console.log("Conectado ao MongoDB ✅");

    await app.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Servidor rodando em http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
