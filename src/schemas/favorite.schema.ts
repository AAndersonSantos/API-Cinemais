import { z } from "zod";

export const createFavoriteSchema = z.object({
  body: z.object({
    mediaId: z.number().min(1, "mediaId é obrigatório"),
  }),
});
