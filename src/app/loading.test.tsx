import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loading from './loading';

describe('Loading Component (app/loading.tsx)', () => {
  it('debe renderizar los elementos skeleton con clases animate-pulse', () => {
    const { container } = render(<Loading />);
    const skeletons = container.querySelectorAll('.animate-pulse');

    // 1 barra de título + 8 tarjetas skeleton = 9 elementos con animate-pulse
    expect(skeletons.length).toBe(9);
  });
});
