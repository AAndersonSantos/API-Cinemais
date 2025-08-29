import { FastifyReply, FastifyRequest } from "fastify";
import { FavoriteService } from "../services/favorite.service";

export class FavoriteController {
  static async addFavorite(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId } = req.params as { userId: string };
      const { mediaId } = req.body as { mediaId: string };

      await FavoriteService.addFavorite(userId, mediaId);
      reply.status(204).send();
    } catch (err) {
      if (err instanceof Error && err.message === "MediaNotFound") {
        return reply.status(404).send({ message: "Mídia não encontrada" });
      }

      if (err instanceof Error && err.message === "FavoriteAlreadyExists") {
        return reply
          .status(400)
          .send({ message: "Essa mídia já esta salva nos favoritos!" });
      }
      reply.status(500).send({ message: "Erro interno do servidor" });
    }
  }

  static async getFavorites(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId } = req.params as { userId: string };
      const favorites = await FavoriteService.getFavorites(userId);
      reply.status(200).send(favorites);
    } catch (err) {
      reply.status(500).send({ message: "Erro interno do servidor" });
    }
  }

  static async removeFavorite(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId, mediaId } = req.params as {
        userId: string;
        mediaId: string;
      };

      await FavoriteService.removeFavorite(userId, mediaId);
      reply.status(204).send();
    } catch (err) {
      if (err instanceof Error && err.message === "FavoriteNotFound") {
        return reply.status(404).send({ message: "Favorito não encontrado!" });
      }

      if (err instanceof Error && err.message === "invalidId") {
        return reply.status(400).send({ message: "ID inválido" });
      }

      reply.status(500).send({ message: "Erro interno do servidor" });
    }
  }
}
