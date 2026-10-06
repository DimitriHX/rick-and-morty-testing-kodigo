import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorComponent from './error';

describe('Error Component (app/error.tsx)', () => {
  it('debe registrar el error en consola y renderizar el mensaje y botón', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const mockError = new Error('Test fetch failure');
    const mockReset = vi.fn();

    render(<ErrorComponent error={mockError} reset={mockReset} />);

    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
    expect(screen.getByRole('heading', { level: 2, name: 'Something went wrong!' })).toBeInTheDocument();
    expect(screen.getByText(/couldn't load the characters/i)).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'Try again' });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockReset).toHaveBeenCalledTimes(1);

    consoleErrorSpy.mockRestore();
  });
});
