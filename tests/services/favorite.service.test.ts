import { FavoriteService } from "../../src/services/favorite.service";
import { FavoriteModel } from "../../src/models/favorite.model";
import { MediaModel } from "../../src/models/media.model";

jest.mock("../../src/models/favorite.model");
jest.mock("../../src/models/media.model");

describe("FavoriteService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addFavorite", () => {

    // Teste do addFavorite com sucesso
    it("should add favorite if media exists and not already favorited", async () => {
      (MediaModel.findById as jest.Mock).mockResolvedValue({ _id: "m1", title: "Matrix" });
      (FavoriteModel.findFavorite as jest.Mock).mockResolvedValue(null);// Não existe favorito ainda
      (FavoriteModel.addFavorite as jest.Mock).mockResolvedValue("fav1");// Mock do addFavorite

      await FavoriteService.addFavorite("u1", "m1");// userId, mediaId

      expect(MediaModel.findById).toHaveBeenCalledWith("m1");// Verifica se a mídia foi buscada
      expect(FavoriteModel.findFavorite).toHaveBeenCalledWith("u1", "m1");// Verifica se o favorito foi buscado
      expect(FavoriteModel.addFavorite).toHaveBeenCalledWith("u1", "m1");// Verifica se o favorito foi adicionado
    });

    // Teste do addFavorite quando a mídia não existe
    it("should throw error if media does not exist", async () => {
      (MediaModel.findById as jest.Mock).mockResolvedValue(null);// Mídia não existe

      //Espera que lance o erro MediaNotFound
      await expect(FavoriteService.addFavorite("u1", "m1")).rejects.toThrow("MediaNotFound");
    });

    // Teste do addFavorite quando o favorito já existe
    it("should throw error if favorite already exists", async () => {
      (MediaModel.findById as jest.Mock).mockResolvedValue({ _id: "m1" });// Mídia existe
      (FavoriteModel.findFavorite as jest.Mock).mockResolvedValue({ _id: "f1" });// Favorito já existe

      //Espera que lance o erro FavoriteAlreadyExists
      await expect(FavoriteService.addFavorite("u1", "m1")).rejects.toThrow("FavoriteAlreadyExists");
    });
  });

  describe("getFavorites", () => {

    // Teste do getFavorites com sucesso
    it("should return media list from favorites", async () => {
      const favorites = [
        { userId: "u1", mediaId: "m1" },
        { userId: "u1", mediaId: "m2" }
      ];
      // Mock das respostas dos modelos
      (FavoriteModel.getFavoritesByUser as jest.Mock).mockResolvedValue(favorites);
      
      // Mock das mídias retornadas
      (MediaModel.findById as jest.Mock)
        .mockResolvedValueOnce({ _id: "m1", title: "Matrix" })
        .mockResolvedValueOnce({ _id: "m2", title: "Inception" });

      const result = await FavoriteService.getFavorites("u1");

      expect(FavoriteModel.getFavoritesByUser).toHaveBeenCalledWith("u1");// Verifica se os favoritos foram buscados
      expect(MediaModel.findById).toHaveBeenCalledTimes(2);// Verifica se findById foi chamado duas vezes
      
      // Verifica se o resultado é a lista correta de mídias
      expect(result).toEqual([
        { _id: "m1", title: "Matrix" },
        { _id: "m2", title: "Inception" }
      ]);
    });

    // Teste do getFavorites quando não há favoritos
    it("should filter out null media", async () => {
      const favorites = [{ userId: "u1", mediaId: "m1" }];
      (FavoriteModel.getFavoritesByUser as jest.Mock).mockResolvedValue(favorites);
      (MediaModel.findById as jest.Mock).mockResolvedValue(null);// Mídia não encontrada

      const result = await FavoriteService.getFavorites("u1");

      expect(result).toEqual([]);// Espera que o resultado seja uma lista vazia
    });
  });

  describe("removeFavorite", () => {

    // Teste do removeFavorite com sucesso
    it("should remove favorite successfully", async () => {
      (FavoriteModel.removeFavorite as jest.Mock).mockResolvedValue({ deletedCount: 1 });// Mock do removeFavorite

      const result = await FavoriteService.removeFavorite("u1", "m1");

      expect(FavoriteModel.removeFavorite).toHaveBeenCalledWith("u1", "m1");// Verifica se o favorito foi removido
      expect(result).toEqual({ deletedCount: 1 });// Verifica o resultado do removeFavorite
    });

    // Teste do removeFavorite quando o favorito não é encontrado
    it("should throw error if favorite not found", async () => {
      (FavoriteModel.removeFavorite as jest.Mock).mockRejectedValue(new Error("FavoriteNotFound"));// Mock para lançar erro

      await expect(FavoriteService.removeFavorite("u1", "m1")).rejects.toThrow("FavoriteNotFound");// Espera que lance o erro FavoriteNotFound
    });
  });
});
