import { FastifyInstance } from "fastify";
import { FavoriteController } from "../controllers/favorite.controller";

export default async function favoriteRoutes(app: FastifyInstance) {
  app.post("/users/:userId/favorites", FavoriteController.addFavorite);
  app.get("/users/:userId/favorites", FavoriteController.getFavorites);
  app.delete("/users/:userId/favorites/:mediaId", FavoriteController.removeFavorite);
}
