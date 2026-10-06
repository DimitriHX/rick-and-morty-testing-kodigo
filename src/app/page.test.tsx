import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from './page';
import * as api from '@/lib/api';
import { createMockCharacter, createMockCharacterResponse } from '@/test/factories';

vi.mock('@/lib/api', () => ({
  getCharacters: vi.fn(),
}));

describe('Home Page Component (app/page.tsx)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe solicitar la página por defecto (1) cuando searchParams no incluye page', async () => {
    const mockCharacter = createMockCharacter({ id: 1, name: 'Rick Sanchez' });
    const mockResponse = createMockCharacterResponse({
      results: [mockCharacter],
      info: { count: 826, pages: 42, next: null, prev: null },
    });

    vi.mocked(api.getCharacters).mockResolvedValue(mockResponse);

    const jsx = await Home({ searchParams: Promise.resolve({}) });
    render(jsx);

    expect(api.getCharacters).toHaveBeenCalledWith(1);
    expect(screen.getByRole('heading', { level: 1, name: 'Rick and Morty Characters' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Rick Sanchez' })).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 42')).toBeInTheDocument();
  });

  it('debe solicitar la página especificada en searchParams', async () => {
    const mockCharacter = createMockCharacter({ id: 2, name: 'Morty Smith' });
    const mockResponse = createMockCharacterResponse({
      results: [mockCharacter],
      info: { count: 826, pages: 42, next: null, prev: null },
    });

    vi.mocked(api.getCharacters).mockResolvedValue(mockResponse);

    const jsx = await Home({ searchParams: Promise.resolve({ page: '3' }) });
    render(jsx);

    expect(api.getCharacters).toHaveBeenCalledWith(3);
    expect(screen.getByRole('heading', { level: 2, name: 'Morty Smith' })).toBeInTheDocument();
    expect(screen.getByText('Page 3 of 42')).toBeInTheDocument();
  });

  it('debe usar página 1 por defecto si page no es de tipo string', async () => {
    const mockResponse = createMockCharacterResponse();
    vi.mocked(api.getCharacters).mockResolvedValue(mockResponse);

    const jsx = await Home({
      searchParams: Promise.resolve({ page: ['1', '2'] }),
    });
    render(jsx);

    expect(api.getCharacters).toHaveBeenCalledWith(1);
  });
});
