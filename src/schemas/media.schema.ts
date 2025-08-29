import { z } from "zod";

export const MediaSchema = z.object({
  title: z.string().min(1, "O título é obrigatório" ),
  description: z.string().min(1, "A descrição é obrigatória"),
  type: z.enum(["movie", "series"], "O tipo deve ser 'movie' ou 'series'"),
  releaseYear: z.number().int().min(1900, "Ano inválido").max(2100, "Ano inválido"),
  genre: z.string().min(1, "O gênero é obrigatório")
});

export type MediaInput = z.infer<typeof MediaSchema>;
