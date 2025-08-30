import { z } from "zod";

export const MediaSchema = z.object({
  title: z.string().nonempty("O título é obrigatório"),
  description: z.string().nonempty("A descrição é obrigatória"),
  type: z.enum(["movie", "series"], "O tipo deve ser 'movie' ou 'series'"),
  releaseYear: z.number().int().min(1900, "Ano inválido").max(2100, "Ano inválido"),
  genre: z.string().nonempty("O gênero é obrigatório"),
});

export type MediaInput = z.infer<typeof MediaSchema>;