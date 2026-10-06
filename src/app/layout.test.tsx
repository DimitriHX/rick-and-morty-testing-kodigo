import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RootLayout from './layout';

describe('RootLayout Component (app/layout.tsx)', () => {
  it('debe renderizar el encabezado, navegación, contenido hijo y pie de página', () => {
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      if (typeof args[0] === 'string' && args[0].includes('cannot be a child of')) {
        return;
      }
      originalError(...args);
    };

    render(
      <RootLayout>
        <div data-testid="child-content">Child Content</div>
      </RootLayout>
    );

    expect(screen.getByText(/🧪 Rick & Morty App/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Characters/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /API Docs/i })).toHaveAttribute(
      'href',
      'https://rickandmortyapi.com/documentation'
    );
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText(/Developed with Next.js, Tailwind CSS/i)).toBeInTheDocument();

    console.error = originalError;
  });
});
