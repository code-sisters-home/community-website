import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    
    const buttons = screen.getAllByText(/Вопрос \d/);
    expect(buttons).toHaveLength(4);
  });

  it('renders all questions from content', () => {
    render(<Faq />);
    
    expect(screen.getByText('Вопрос 1')).toBeTruthy();
    expect(screen.getByText('Вопрос 2')).toBeTruthy();
    expect(screen.getByText('Вопрос 3')).toBeTruthy();
    expect(screen.getByText('Вопрос 4')).toBeTruthy();
  });

  it('expands and shows answer when button is clicked', async () => {
    const user = userEvent.setup();
    render(<Faq />);
    
    // Проверяем, что ответ изначально не виден
    const answer = screen.queryByText('Ответ 1');
    expect(answer).toBeNull(); // или expect(answer).not.toBeTruthy();
    
    // Находим кнопку первого вопроса и кликаем по ней
    const button = screen.getByText('Вопрос 1');
    await user.click(button);
    
    // Проверяем, что ответ появился
    expect(screen.getByText('Ответ 1')).toBeTruthy();
  });

  it('collapses and hides answer when button is clicked twice', async () => {
    const user = userEvent.setup();
    render(<Faq />);
    
    const button = screen.getByText('Вопрос 1');
    
    // Первый клик - раскрываем
    await user.click(button);
    expect(screen.getByText('Ответ 1')).toBeTruthy();
    
    // Второй клик - скрываем
    await user.click(button);
    expect(screen.queryByText('Ответ 1')).toBeNull();
  });

  it('handles multiple independent disclosures', async () => {
    const user = userEvent.setup();
    render(<Faq />);
    
    const button1 = screen.getByText('Вопрос 1');
    const button2 = screen.getByText('Вопрос 2');
    
    // Раскрываем первый вопрос
    await user.click(button1);
    expect(screen.getByText('Ответ 1')).toBeTruthy();
    expect(screen.queryByText('Ответ 2')).toBeNull();
    
    // Раскрываем второй вопрос
    await user.click(button2);
    expect(screen.getByText('Ответ 1')).toBeTruthy();
    expect(screen.getByText('Ответ 2')).toBeTruthy();
    
    // Скрываем первый вопрос
    await user.click(button1);
    expect(screen.queryByText('Ответ 1')).toBeNull();
    expect(screen.getByText('Ответ 2')).toBeTruthy();
  });

it('toggles chevron icon rotation when expanded/collapsed', async () => {
  const user = userEvent.setup();
  render(<Faq />);
  
  const button = screen.getByText('Вопрос 1');
  
  // Находим иконку через классы
  const chevronIcon = document.querySelector('.w-5.h-5');
  expect(chevronIcon).toBeTruthy();
  
  // Проверяем начальное состояние
  expect(chevronIcon?.classList.contains('rotate-180')).toBe(false);
  
  // Кликаем - раскрываем
  await user.click(button);
  
  // Проверяем, что класс появился
  expect(chevronIcon?.classList.contains('rotate-180')).toBe(true);
  
  // Кликаем - закрываем
  await user.click(button);
  expect(chevronIcon?.classList.contains('rotate-180')).toBe(false);
});
});