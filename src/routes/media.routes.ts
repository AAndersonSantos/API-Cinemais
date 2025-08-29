import { FastifyInstance } from "fastify";
import { MediaController } from "../controllers/media.controller";

export default async function mediaRoutes(fastify: FastifyInstance) {
  fastify.post("/media", MediaController.createMedia);
  fastify.get("/media", MediaController.getMedia);
  fastify.get("/media/:id", MediaController.getMediaById);
}
