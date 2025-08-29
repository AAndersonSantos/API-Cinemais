import { FavoriteModel } from "../models/favorite.model";
import { MediaModel } from "../models/media.model";

export class FavoriteService {
  static async addFavorite(userId: string, mediaId: string) {
    const media = await MediaModel.findById(mediaId);
    if (!media) {
      throw new Error("MediaNotFound");
    }

    const existing = await FavoriteModel.findFavorite(userId, mediaId);
    if (existing) {
      throw new Error("FavoriteAlreadyExists");
    }

    await FavoriteModel.addFavorite(userId, mediaId);
  }

  static async getFavorites(userId: string) {
    const favorites = await FavoriteModel.getFavoritesByUser(userId);
    const mediaList = await Promise.all(
      favorites.map(fav => MediaModel.findById(fav.mediaId.toString()))
    );

    return mediaList.filter(Boolean);
  }

  static async removeFavorite(userId: string, mediaId: string) {
    const removed = await FavoriteModel.removeFavorite(userId, mediaId);
    return removed;
  }
}
