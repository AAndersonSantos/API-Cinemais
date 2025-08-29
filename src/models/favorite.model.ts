import { ObjectId } from "mongodb";
import client from "../db";

export interface Favorite {
  _id?: ObjectId;
  userId: string;
  mediaId: ObjectId;
}

const collection = () => client.db("cinemais").collection<Favorite>("favorites");

export const FavoriteModel = {
  addFavorite: async (userId: string, mediaId: string) => {
    const objId = new ObjectId(mediaId);
    const result = await collection().insertOne({ userId, mediaId: objId });
    return result.insertedId;
  },

  getFavoritesByUser: async (userId: string) => {
    return collection().find({ userId }).toArray();
  },

  findFavorite: async (userId: string, mediaId: string) => {
    const objId = new ObjectId(mediaId);
    return collection().findOne({ userId, mediaId: objId });
  },

  removeFavorite: async (userId: string, mediaId: string) => {

    if (!ObjectId.isValid(mediaId)) {
    throw new Error("invalidId");
    }

    const objId = new ObjectId(mediaId);
    const result = await collection().deleteOne({ userId, mediaId: objId });

    if (result.deletedCount === 0) {
      throw new Error("FavoriteNotFound");
    }

    return result;
  },
};
