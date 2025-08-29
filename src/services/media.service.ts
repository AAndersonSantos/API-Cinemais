import { Media, MediaModel } from "../models/media.model";

export class MediaService {
  static async createMedia(data: Media) {
    return MediaModel.create(data);
  }

  static async getAllMedia() {
    return MediaModel.findAll();
  }

  static async getMediaById(id: string) {
    return MediaModel.findById(id);
  }
}
