import { MediaController } from "../../src/controllers/media.controller";
import { MediaService } from "../../src/services/media.service";

const mockReply = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock("../../src/services/media.service");

describe("MediaController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createMedia", () => {
    // Teste do createMedia com sucesso
    it("should create media and return 201", async () => {
      const req: any = {
        body: {
          title: "Matrix",
          description: "desc",
          type: "movie",
          releaseYear: 2025,
          genre: "Sci-Fi",
        },
      };

      const reply = mockReply();

      const createdMedia = { _id: "1", ...req.body };
      (MediaService.createMedia as jest.Mock).mockResolvedValue(createdMedia);

      await MediaController.createMedia(req, reply);

      expect(MediaService.createMedia).toHaveBeenCalledWith(req.body); // Verifica se o serviço foi chamado com os dados corretos
      expect(reply.status).toHaveBeenCalledWith(201); // Verifica se o status 201 foi retornado
      expect(reply.send).toHaveBeenCalledWith(createdMedia); // Verifica se a mídia criada foi retornada
    });

    // Teste do createMedia quando a validação falha
    it("should return 400 if validation fails", async () => {
      const req: any = { body: { title: "", description: "desc" } };
      const reply = mockReply();

      await MediaController.createMedia(req, reply);

      expect(reply.status).toHaveBeenCalledWith(400); // Verifica se o status 400 foi retornado
      expect(reply.send).toHaveBeenCalled(); // Verifica se o método send foi chamado
      const sent = (reply.send as jest.Mock).mock.calls[0][0]; // Pega o primeiro argumento do primeiro call de send
      expect(sent.errors).toContain("O título é obrigatório"); // Verifica se a mensagem de erro correta foi retornada
    });
  });

  describe("getMediaById", () => {

    // Teste do getMediaById com sucesso
    it("should return media if found", async () => {
  
      const req: any = { params: { id: "1" } };// Mock do request com o ID da mídia
      const reply = mockReply();

      const media = {
        _id: "1",
        title: "Matrix",
        description: "desc",
        type: "movie",
        releaseYear: 2025,
        genre: "Sci-Fi",
      };
      // Configura o mock para retornar a mídia acima
      (MediaService.getMediaById as jest.Mock).mockResolvedValue(media);

      await MediaController.getMediaById(req, reply);

      expect(MediaService.getMediaById).toHaveBeenCalledWith("1"); // Verifica se o serviço foi chamado com o ID correto
      expect(reply.status).toHaveBeenCalledWith(200); // Verifica se o status 200 foi retornado
      expect(reply.send).toHaveBeenCalledWith(media); // Verifica se a mídia foi retornada
    });

    // Teste do getMediaById quando a mídia não é encontrada
    it("should return 404 if media not found", async () => {
      const req: any = { params: { id: "999" } };// Mock do request com um ID inexistente
      const reply = mockReply();

      (MediaService.getMediaById as jest.Mock).mockResolvedValue(null);// Configura o mock para retornar null

      await MediaController.getMediaById(req, reply);

      expect(reply.status).toHaveBeenCalledWith(404);// Verifica se o status 404 foi retornado
      expect(reply.send).toHaveBeenCalledWith({
        message: "Mídia não encontrada",
      });// Verifica se a mensagem correta foi retornada
    });

  });
});
