import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  it('debe deshabilitar Previous y habilitar Next cuando currentPage es 1', () => {
    render(<Pagination currentPage={1} totalPages={10} />);

    expect(screen.getByText('Page 1 of 10')).toBeInTheDocument();

    const nextLink = screen.getByRole('link', { name: /next/i });
    expect(nextLink).toHaveAttribute('href', '/?page=2');

    const prevSpan = screen.getByText(/previous/i);
    expect(prevSpan.tagName).toBe('SPAN');
    expect(prevSpan).toHaveClass('cursor-not-allowed');
  });

  it('debe habilitar Previous y Next en una página intermedia', () => {
    render(<Pagination currentPage={3} totalPages={10} />);

    expect(screen.getByText('Page 3 of 10')).toBeInTheDocument();

    const prevLink = screen.getByRole('link', { name: /previous/i });
    expect(prevLink).toHaveAttribute('href', '/?page=2');

    const nextLink = screen.getByRole('link', { name: /next/i });
    expect(nextLink).toHaveAttribute('href', '/?page=4');
  });

  it('debe habilitar Previous y deshabilitar Next cuando se está en la última página', () => {
    render(<Pagination currentPage={10} totalPages={10} />);

    expect(screen.getByText('Page 10 of 10')).toBeInTheDocument();

    const prevLink = screen.getByRole('link', { name: /previous/i });
    expect(prevLink).toHaveAttribute('href', '/?page=9');

    const nextSpan = screen.getByText(/next/i);
    expect(nextSpan.tagName).toBe('SPAN');
    expect(nextSpan).toHaveClass('cursor-not-allowed');
  });

  it('debe deshabilitar tanto Previous como Next cuando totalPages es 1', () => {
    render(<Pagination currentPage={1} totalPages={1} />);

    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument();

    const prevSpan = screen.getByText(/previous/i);
    const nextSpan = screen.getByText(/next/i);

    expect(prevSpan.tagName).toBe('SPAN');
    expect(prevSpan).toHaveClass('cursor-not-allowed');
    expect(nextSpan.tagName).toBe('SPAN');
    expect(nextSpan).toHaveClass('cursor-not-allowed');
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
