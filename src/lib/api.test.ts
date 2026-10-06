import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getCharacters, getCharacter, getEpisodes } from './api';
import { createMockCharacter, createMockCharacterResponse, createMockEpisode } from '@/test/factories';

describe('API functions (lib/api.ts)', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  describe('getCharacters', () => {
    it('debe obtener personajes con la página por defecto (page = 1)', async () => {
      const mockData = createMockCharacterResponse();
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response);

      const result = await getCharacters();

      expect(globalThis.fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character?page=1');
      expect(result).toEqual(mockData);
    });

    it('debe obtener personajes con un número de página específico', async () => {
      const mockData = createMockCharacterResponse();
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response);

      const result = await getCharacters(3);

      expect(globalThis.fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character?page=3');
      expect(result).toEqual(mockData);
    });

    it('debe lanzar un error cuando res.ok sea false', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(getCharacters(1)).rejects.toThrow('Failed to fetch characters');
    });

    it('debe propagar un error de red si fetch falla', async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      await expect(getCharacters(1)).rejects.toThrow('Network error');
    });
  });

  describe('getCharacter', () => {
    it('debe obtener el detalle de un personaje por id exitosamente', async () => {
      const mockCharacter = createMockCharacter({ id: 1 });
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockCharacter,
      } as Response);

      const result = await getCharacter('1');

      expect(globalThis.fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1');
      expect(result).toEqual(mockCharacter);
    });

    it('debe lanzar un error cuando res.ok sea false', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      } as Response);

      await expect(getCharacter('9999')).rejects.toThrow('Failed to fetch character details');
    });
  });

  describe('getEpisodes', () => {
    it('debe retornar un array vacío si la lista de ids está vacía sin invocar fetch', async () => {
      globalThis.fetch = vi.fn();

      const result = await getEpisodes([]);

      expect(result).toEqual([]);
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });

    it('debe solicitar múltiples episodios y retornar el array recibido', async () => {
      const ep1 = createMockEpisode({ id: 1, episode: 'S01E01' });
      const ep2 = createMockEpisode({ id: 2, episode: 'S01E02' });
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [ep1, ep2],
      } as Response);

      const result = await getEpisodes(['1', '2']);

      expect(globalThis.fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/episode/1,2');
      expect(result).toEqual([ep1, ep2]);
    });

    it('debe normalizar a un array cuando la API retorne un solo objeto para un id', async () => {
      const singleEp = createMockEpisode({ id: 1 });
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => singleEp,
      } as Response);

      const result = await getEpisodes(['1']);

      expect(globalThis.fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/episode/1');
      expect(result).toEqual([singleEp]);
    });

    it('debe lanzar un error si res.ok es false al pedir episodios', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(getEpisodes(['1'])).rejects.toThrow('Failed to fetch episodes');
    });
  });
});
