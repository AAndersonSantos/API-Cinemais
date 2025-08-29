import { ObjectId } from "mongodb";
import client from "../db";

export interface Media {
  _id?: ObjectId;
  title: string;
  description: string;
  type: "movie" | "series";
  releaseYear: number;
  genre: string;
}

const collection = () => client.db("cinemais").collection<Media>("media");

export const MediaModel = {
  create: async (media: Media) => {
    const result = await collection().insertOne(media);
    return { _id: result.insertedId, ...media };
  },

  findAll: async () => {
    return collection().find().toArray();
  },

  findById: async (id: string) => {
    if (!ObjectId.isValid(id)) return null;
    const objId = new ObjectId(id);
    return collection().findOne({ _id: objId });
  },
};
