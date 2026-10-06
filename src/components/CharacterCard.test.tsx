import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CharacterCard from './CharacterCard';
import { createMockCharacter } from '@/test/factories';

describe('CharacterCard Component', () => {
  it('debe renderizar el nombre, especie, ubicación e imagen del personaje', () => {
    const character = createMockCharacter({
      id: 42,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      location: { name: 'Earth (Replacement Dimension)', url: '' },
    });

    render(<CharacterCard character={character} />);

    expect(screen.getByRole('heading', { level: 2, name: 'Morty Smith' })).toBeInTheDocument();
    expect(screen.getByText('Alive - Human')).toBeInTheDocument();
    expect(screen.getByText('Earth (Replacement Dimension)')).toBeInTheDocument();
    expect(screen.getByText('Last known location:')).toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/character/42');

    const image = screen.getByAltText('Morty Smith');
    expect(image).toBeInTheDocument();
  });

  it('debe aplicar la clase bg-green-500 cuando el estado es Alive', () => {
    const character = createMockCharacter({ status: 'Alive' });
    const { container } = render(<CharacterCard character={character} />);
    const dot = container.querySelector('.bg-green-500');
    expect(dot).toBeInTheDocument();
  });

  it('debe aplicar la clase bg-red-500 cuando el estado es Dead', () => {
    const character = createMockCharacter({ status: 'Dead' });
    const { container } = render(<CharacterCard character={character} />);
    const dot = container.querySelector('.bg-red-500');
    expect(dot).toBeInTheDocument();
  });

  it('debe aplicar la clase bg-gray-500 cuando el estado es unknown', () => {
    const character = createMockCharacter({ status: 'unknown' });
    const { container } = render(<CharacterCard character={character} />);
    const dot = container.querySelector('.bg-gray-500');
    expect(dot).toBeInTheDocument();
  });

  it('debe usar bg-gray-500 como fallback si el estado no está mapeado', () => {
    // Forzamos un estado arbitrario para cubrir la rama fallback || 'bg-gray-500'
    const character = createMockCharacter({
      status: 'CustomStatus' as unknown as 'Alive',
    });
    const { container } = render(<CharacterCard character={character} />);
    const dot = container.querySelector('.bg-gray-500');
    expect(dot).toBeInTheDocument();
  });
});
