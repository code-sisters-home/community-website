// Footer.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../../components/Footer';

// Мокаем Container компонент
vi.mock('@/components/Container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-container">{children}</div>
  ),
}));

describe('Footer Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render footer element', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeTruthy();
  });


  it('should display copyright text with current year', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(
      `Copyright © 2016 - ${currentYear}. Made with ♥`
    );
    expect(copyrightText).toBeTruthy();
  });

it('should update year dynamically', () => {
  // Фиксируем дату для теста
  const mockDate = new Date('2025-01-01');
  vi.useFakeTimers();
  vi.setSystemTime(mockDate);

  render(<Footer />);
  
  const copyrightElement = screen.getByText(/Copyright ©/);
  expect(copyrightElement.textContent).toBe('Copyright © 2016 - 2025. Made with ♥');
  
  vi.useRealTimers();
});
});