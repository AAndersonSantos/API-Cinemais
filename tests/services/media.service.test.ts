jest.mock("../../src/models/media.model", () => ({
  MediaModel: {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
  },
}));

import { MediaService } from "../../src/services/media.service";
import { MediaModel } from "../../src/models/media.model";

describe("MediaService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Teste do createMedia
  it("should call MediaModel.create and return created media", async () => {

    // Mock dos dados de entrada para criar uma mídia
    const data = {
      title: "Matrix Genérica",
      description: "desc",
      type: "movie" as const,
      releaseYear: 2025,
      genre: "Ficção Científica",
    };

    // Mock do resultado esperado após a criação da mídia
    const created = { _id: "1", ...data };
    
    // Configura o mock para retornar o objeto criado acima
    (MediaModel.create as jest.Mock).mockResolvedValue(created);

    const result = await MediaService.createMedia(data);

    // Verifica se MediaModel.create foi chamado com os dados corretos
    expect(MediaModel.create).toHaveBeenCalledWith(data);

    // Verifica se o resultado é igual ao objeto mockado de mídia criada
    expect(result).toEqual(created);
  });

  // Testes do getAllMedia
  it("should call MediaModel.findAll and return all media", async () => {

    // Mock de todas as mídias, retornadas pelo MediaModel.findAll
    const allMedia = [
      {
        _id: "1",
        title: "Matrix Genérica",
        description: "desc",
        type: "movie",
        releaseYear: 2025,
        genre: "Ficção Científica",
      },
      {
        _id: "2",
        title: "Matrix Genérica 2",
        description: "desc",
        type: "movie",
        releaseYear: 2025,
        genre: "Ficção Científica",
      },
    ];
    // Configura o mock para retornar todas as mídias acima
    (MediaModel.findAll as jest.Mock).mockResolvedValue(allMedia);

    const result = await MediaService.getAllMedia();

    // Verifica se MediaModel.findAll foi chamado
    expect(MediaModel.findAll).toHaveBeenCalled();

    // Verifica se o resultado é igual à lista mockada de todas as mídias
    expect(result).toEqual(allMedia);
  });

  // Testes do getMediaById
  it("should call MediaModel.findById and return the media", async () => {
    // Mock da mídia, retornada pelo MediaModel.findById
    const media = {
      _id: "1",
      title: "Matrix Genérica",
      description: "desc",
      type: "movie",
      releaseYear: 2025,
      genre: "Ficção Científica",
    };

    // Configura o mock para retornar a mídia acima
    (MediaModel.findById as jest.Mock).mockResolvedValue(media);

    const result = await MediaService.getMediaById("1");

    // Verifica se MediaModel.findById foi chamado com o ID correto
    expect(MediaModel.findById).toHaveBeenCalledWith("1");

    // Verifica se o resultado é igual à mídia mockada
    expect(result).toEqual(media);
  });

  // Teste do getMediaById quando a mídia não é encontrada
  it("should return null if media is not found", async () => {
    // Configura o mock para retornar null
    (MediaModel.findById as jest.Mock).mockResolvedValue(null);

    const result = await MediaService.getMediaById("999");

    // Verifica se MediaModel.findById foi chamado com o ID correto
    expect(MediaModel.findById).toHaveBeenCalledWith("999");

    // Verifica se o resultado é null quando a mídia não é encontrada
    expect(result).toBeNull();
  });
});
