import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Faq } from '../../components/Faq';

// Мокаем данные из content.json
vi.mock('@public/content.json', () => ({
  default: {
    faq: [
      { question: 'Вопрос 1', answer: 'Ответ 1' },
      { question: 'Вопрос 2', answer: 'Ответ 2' },
      { question: 'Вопрос 3', answer: 'Ответ 3' },
      { question: 'Вопрос 4', answer: 'Ответ 4' },
    ],
  },
}));

describe('Faq Component', () => {
  it('renders correct number of DisclosureButton components', () => {
    render(<Faq />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
  });

  it('renders all questions from content', () => {
    render(<Faq />);
    
    expect(screen.getByText('Вопрос 1')).toBeTruthy();
    expect(screen.getByText('Вопрос 2')).toBeTruthy();
    expect(screen.getByText('Вопрос 3')).toBeTruthy();
    expect(screen.getByText('Вопрос 4')).toBeTruthy();
  });
});