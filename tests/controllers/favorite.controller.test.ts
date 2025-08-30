// tests/controllers/favorite.controller.test.ts
import { FavoriteController } from "../../src/controllers/favorite.controller";
import { FavoriteService } from "../../src/services/favorite.service";

jest.mock("../../src/services/favorite.service");

const mockReply = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("FavoriteController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addFavorite", () => {

    //Teste do addFavorite com sucesso
    it("should add favorite and return 204", async () => {
      const req: any = { params: { userId: "u1" }, body: { mediaId: "m1" } };// Simula a requisição
      const reply = mockReply();

      (FavoriteService.addFavorite as jest.Mock).mockResolvedValue(undefined);// Mock do serviço

      await FavoriteController.addFavorite(req, reply);

      expect(FavoriteService.addFavorite).toHaveBeenCalledWith("u1", "m1");// Verifica se o serviço foi chamado com os parâmetros corretos
      expect(reply.status).toHaveBeenCalledWith(204);// Verifica se o status 204 foi retornado
    });

    // Teste do addFavorite quando a mídia não é encontrada
    it("should return 404 if media not found", async () => {
      const req: any = { params: { userId: "u1" }, body: { mediaId: "m999" } };// Simula a requisição
      const reply = mockReply();

      (FavoriteService.addFavorite as jest.Mock).mockRejectedValue(new Error("MediaNotFound"));// Mock para lançar erro

      await FavoriteController.addFavorite(req, reply);

      expect(reply.status).toHaveBeenCalledWith(404);// Verifica se o status 404 foi retornado
      expect(reply.send).toHaveBeenCalledWith({ message: "Mídia não encontrada" });// Verifica a mensagem de erro
    });

    // Teste do addFavorite quando o favorito já existe
    it("should return 400 if favorite already exists", async () => {
      const req: any = { params: { userId: "u1" }, body: { mediaId: "m1" } };// Simula a requisição
      const reply = mockReply();

      (FavoriteService.addFavorite as jest.Mock).mockRejectedValue(new Error("FavoriteAlreadyExists"));// Mock para lançar erro

      await FavoriteController.addFavorite(req, reply);

      expect(reply.status).toHaveBeenCalledWith(400);// Verifica se o status 400 foi retornado
      expect(reply.send).toHaveBeenCalledWith({ message: "Essa mídia já esta salva nos favoritos!" });// Verifica a mensagem de erro
    });

  });

  describe("getFavorites", () => {

    // Teste do getFavorites com sucesso
    it("should return 200 with favorites", async () => {
      const req: any = { params: { userId: "u1" } };// Mock do request
      const reply = mockReply();
      const favorites = [{ _id: "f1", mediaId: "m1" }];// Mock dos favoritos retornados

      // Mock do serviço para retornar os favoritos
      (FavoriteService.getFavorites as jest.Mock).mockResolvedValue(favorites);

      await FavoriteController.getFavorites(req, reply);

      expect(FavoriteService.getFavorites).toHaveBeenCalledWith("u1");// Verifica se o serviço foi chamado com o userId correto
      expect(reply.status).toHaveBeenCalledWith(200);// Verifica se o status 200 foi retornado
      expect(reply.send).toHaveBeenCalledWith(favorites);// Verifica se os favoritos foram retornados
    });

    // Teste do getFavorites quando ocorre um erro
    it("should return 500 on error", async () => {
      const req: any = { params: { userId: "u1" } };// Mock do request
      const reply = mockReply();

      // Mock do serviço para lançar um erro
      (FavoriteService.getFavorites as jest.Mock).mockRejectedValue(new Error("DB error"));

      await FavoriteController.getFavorites(req, reply);

      expect(reply.status).toHaveBeenCalledWith(500);// Verifica se o status 500 foi retornado
      expect(reply.send).toHaveBeenCalledWith({ message: "Erro interno do servidor" });// Verifica a mensagem de erro
    });
  });

  // Teste do removeFavorite
  describe("removeFavorite", () => {

    // Teste do removeFavorite com sucesso
    it("should remove favorite and return 204", async () => {
      const req: any = { params: { userId: "u1", mediaId: "m1" } };// Mock do request
      const reply = mockReply();

      (FavoriteService.removeFavorite as jest.Mock).mockResolvedValue(undefined);// Mock do serviço

      await FavoriteController.removeFavorite(req, reply);

      expect(FavoriteService.removeFavorite).toHaveBeenCalledWith("u1", "m1");// Verifica se o serviço foi chamado com os parâmetros corretos
      expect(reply.status).toHaveBeenCalledWith(204);// Verifica se o status 204 foi retornado
    });

    // Teste do removeFavorite quando o favorito não é encontrado
    it("should return 404 if favorite not found", async () => {
      const req: any = { params: { userId: "u1", mediaId: "m999" } };// Mock do request
      const reply = mockReply();

      (FavoriteService.removeFavorite as jest.Mock).mockRejectedValue(new Error("FavoriteNotFound"));// Mock para lançar erro

      await FavoriteController.removeFavorite(req, reply);

      expect(reply.status).toHaveBeenCalledWith(404);// Verifica se o status 404 foi retornado
      expect(reply.send).toHaveBeenCalledWith({ message: "Favorito não encontrado!" });// Verifica a mensagem de erro
    });

    // Teste do removeFavorite quando o ID é inválido
    it("should return 400 if invalid id", async () => {
      const req: any = { params: { userId: "u1", mediaId: "abc" } };// Mock do request
      const reply = mockReply();

      (FavoriteService.removeFavorite as jest.Mock).mockRejectedValue(new Error("invalidId"));// Mock para lançar erro

      await FavoriteController.removeFavorite(req, reply);

      expect(reply.status).toHaveBeenCalledWith(400);// Verifica se o status 400 foi retornado
      expect(reply.send).toHaveBeenCalledWith({ message: "ID inválido" });// Verifica a mensagem de erro
    });
    
  });
});
