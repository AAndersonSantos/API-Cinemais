import { MongoClient, Db } from "mongodb";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/cinemais";
const client = new MongoClient(mongoUrl);

let db: Db;

export const connectDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db();
    console.log("Conectado ao MongoDB ✅");
  }
  return db;
};

export default client;
export { db };
