import { FastifyReply, FastifyRequest } from "fastify";
import { MediaService } from "../services/media.service";
import { MediaSchema, MediaInput } from "../schemas/media.schema";

export class MediaController {
  static async createMedia(req: FastifyRequest, reply: FastifyReply) {
    try {
      const body: MediaInput = MediaSchema.parse(req.body);

      const createdMedia = await MediaService.createMedia(body);
      reply.status(201).send(createdMedia);
    } catch (err: any) {
      if (err.name === "ZodError") {
        const formattedErrors = err.issues.map((e: any) => e.message);
        return reply.status(400).send({ errors: formattedErrors });
      }

      reply.status(500).send({ message: "Erro interno do servidor" });
    }
  }

  static async getMedia(req: FastifyRequest, reply: FastifyReply) {
    try {
      const media = await MediaService.getAllMedia();
      reply.status(200).send(media);
    } catch (err) {
      reply.status(500).send({ message: "Erro interno do servidor" });
    }
  }

  static async getMediaById(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: string };
      const media = await MediaService.getMediaById(id);

      if (!media) {
        return reply.status(404).send({ message: "Mídia não encontrada" });
      }

      reply.status(200).send(media);
    } catch (err) {
      reply.status(500).send({ message: "Erro interno do servidor" });
    }
  }
}
