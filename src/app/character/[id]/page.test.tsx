import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CharacterPage from './page';
import * as api from '@/lib/api';
import { createMockCharacter, createMockEpisode } from '@/test/factories';

vi.mock('@/lib/api', () => ({
  getCharacter: vi.fn(),
  getEpisodes: vi.fn(),
}));

describe('CharacterPage Component (app/character/[id]/page.tsx)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar los detalles completos del personaje con status Alive y fallback Unknown para type', async () => {
    const mockCharacter = createMockCharacter({
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      type: '',
      origin: { name: 'Earth (C-137)', url: '' },
      location: { name: 'Citadel of Ricks', url: '' },
      created: '2017-11-04T18:48:46.250Z',
      episode: ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'],
    });

    const mockEpisodes = [
      createMockEpisode({ id: 1, episode: 'S01E01', name: 'Pilot', air_date: 'December 2, 2013' }),
      createMockEpisode({ id: 2, episode: 'S01E02', name: 'Lawnmower Dog', air_date: 'December 9, 2013' }),
    ];

    vi.mocked(api.getCharacter).mockResolvedValue(mockCharacter);
    vi.mocked(api.getEpisodes).mockResolvedValue(mockEpisodes);

    const jsx = await CharacterPage({ params: Promise.resolve({ id: '1' }) });
    const { container } = render(jsx);

    expect(api.getCharacter).toHaveBeenCalledWith('1');
    expect(api.getEpisodes).toHaveBeenCalledWith(['1', '2']);

    expect(screen.getByRole('heading', { level: 1, name: 'Rick Sanchez' })).toBeInTheDocument();
    expect(screen.getByText('Alive - Human')).toBeInTheDocument();
    expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('Unknown')).toBeInTheDocument(); // type fallback

    // Status dot verde
    expect(container.querySelector('.bg-green-500')).toBeInTheDocument();

    // Episodios
    expect(screen.getByRole('heading', { level: 3, name: 'Episodes (2)' })).toBeInTheDocument();
    expect(screen.getByText('S01E01')).toBeInTheDocument();
    expect(screen.getByText('S01E02')).toBeInTheDocument();

    // Link de regreso
    const backLink = screen.getByRole('link', { name: /Back to Characters/i });
    expect(backLink).toHaveAttribute('href', '/');
  });

  it('debe aplicar la clase bg-red-500 cuando el status es Dead y mostrar el type específico si existe', async () => {
    const mockCharacter = createMockCharacter({
      id: 2,
      name: 'Adolf Smith',
      status: 'Dead',
      type: 'Clone',
      episode: [],
    });

    vi.mocked(api.getCharacter).mockResolvedValue(mockCharacter);
    vi.mocked(api.getEpisodes).mockResolvedValue([]);

    const jsx = await CharacterPage({ params: Promise.resolve({ id: '2' }) });
    const { container } = render(jsx);

    expect(screen.getByText('Clone')).toBeInTheDocument();
    expect(container.querySelector('.bg-red-500')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Episodes (0)' })).toBeInTheDocument();
  });

  it('debe aplicar la clase bg-gray-500 cuando el status es unknown', async () => {
    const mockCharacter = createMockCharacter({
      id: 3,
      status: 'unknown',
      episode: [],
    });

    vi.mocked(api.getCharacter).mockResolvedValue(mockCharacter);
    vi.mocked(api.getEpisodes).mockResolvedValue([]);

    const jsx = await CharacterPage({ params: Promise.resolve({ id: '3' }) });
    const { container } = render(jsx);

    expect(container.querySelector('.bg-gray-500')).toBeInTheDocument();
  });
});
