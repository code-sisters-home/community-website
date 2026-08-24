// Gallery.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Gallery, GalleryItem } from '../../components/Gallery';

describe('Gallery Component', () => {
  const mockItems: GalleryItem[] = [
    { id: '1', content: <div>Item 1</div> },
    { id: '2', content: <div>Item 2</div> },
    { id: '3', content: <div>Item 3</div> },
    { id: '4', content: <div>Item 4</div> },
    { id: '5', content: <div>Item 5</div> },
    { id: '6', content: <div>Item 6</div> },
  ];

  const mockUpdateItemsPerPage = vi.fn();
  const mockOnNext = vi.fn();
  const mockOnPrev = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Мокаем offsetWidth для контейнера
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 1200,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render all items', () => {
      render(
        <Gallery
          items={mockItems}
          itemsPerPage={3}
          updateItemsPerPage={mockUpdateItemsPerPage}
          onNext={mockOnNext}
          onPrev={mockOnPrev}
        />
      );

      mockItems.forEach((item) => {
        expect(screen.getByText(`Item ${item.id}`)).toBeTruthy();
      });
    });

    it('should render navigation buttons', () => {
      render(
        <Gallery
          items={mockItems}
          itemsPerPage={3}
          updateItemsPerPage={mockUpdateItemsPerPage}
          onNext={mockOnNext}
          onPrev={mockOnPrev}
        />
      );

      const prevButton = screen.getByText('<');
      const nextButton = screen.getByText('>');
      
      expect(prevButton).toBeTruthy();
      expect(nextButton).toBeTruthy();
    });

it('should disable prev button on first page', () => {
  render(
    <Gallery
      items={mockItems}
      itemsPerPage={3}
      updateItemsPerPage={mockUpdateItemsPerPage}
      onNext={mockOnNext}
      onPrev={mockOnPrev}
    />
  );

  const prevButton = screen.getByText('<');
  
  // Проверка через getAttribute
  expect(prevButton.getAttribute('disabled')).not.toBeNull();
  expect(prevButton.getAttribute('disabled')).toBe('');
  
  // Проверка классов
  expect(prevButton.className).toContain('opacity-30');
  expect(prevButton.className).toContain('cursor-not-allowed');
  expect(prevButton.className).not.toContain('opacity-100');
  
  // Проверка стиля
  expect(prevButton.style.transform).toBe('scaleY(3)');
});
it('should disable next button on last page', () => {
  render(
    <Gallery
      items={mockItems}
      itemsPerPage={3}
      updateItemsPerPage={mockUpdateItemsPerPage}
      onNext={mockOnNext}
      onPrev={mockOnPrev}
    />
  );

  const nextButton = screen.getByText('>');
  
  // Проверка начального состояния (активно)
  expect(nextButton.hasAttribute('disabled')).toBe(false);
  expect(nextButton.className).toContain('opacity-100');
  
  // Кликаем для перехода на последнюю страницу
  fireEvent.click(nextButton); // страница 1
  fireEvent.click(nextButton); // страница 2 (последняя)
  
  // Проверка конечного состояния (disabled)
  expect(nextButton.hasAttribute('disabled')).toBe(true);
  expect(nextButton.className).toContain('opacity-30');
  expect(nextButton.className).toContain('cursor-not-allowed');
});
  })

describe('Navigation - Forward', () => {
  it('should navigate to next page when Next button is clicked', () => {
    render(
      <Gallery
        items={mockItems}
        itemsPerPage={3}
        updateItemsPerPage={mockUpdateItemsPerPage}
        onNext={mockOnNext}
        onPrev={mockOnPrev}
      />
    );

    const nextButton = screen.getByText('>');
    const container = document.querySelector<HTMLElement>('.flex');

    // Проверяем начальную позицию
    expect(container?.style.transform).toMatch(/translateX\(-?0%\)/);

    // Кликаем Next
    fireEvent.click(nextButton);

    // Проверяем, что трансформация изменилась на -100%
    expect(container?.style.transform).toBe('translateX(-100%)');
    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });
});
describe('Navigation - Backward', () => {
  it('should navigate to previous page when Prev button is clicked', () => {
    render(
      <Gallery
        items={mockItems}
        itemsPerPage={3}
        updateItemsPerPage={mockUpdateItemsPerPage}
        onNext={mockOnNext}
        onPrev={mockOnPrev}
      />
    );

    const nextButton = screen.getByText('>');
    const prevButton = screen.getByText('<');
    const container = document.querySelector<HTMLElement>('.flex');

    // Сначала переходим на вторую страницу
    fireEvent.click(nextButton);
    expect(container?.style.transform).toBe('translateX(-100%)');

    // Теперь кликаем Prev
    fireEvent.click(prevButton);
    expect(container?.style.transform).toMatch(/translateX\(-?0%\)/);
    expect(mockOnPrev).toHaveBeenCalledTimes(1);
  });

  it('should navigate multiple pages backward', () => {
    render(
      <Gallery
        items={mockItems}
        itemsPerPage={2}
        updateItemsPerPage={mockUpdateItemsPerPage}
        onNext={mockOnNext}
        onPrev={mockOnPrev}
      />
    );

    const nextButton = screen.getByText('>');
    const prevButton = screen.getByText('<');
    const container = document.querySelector<HTMLElement>('.flex');

    // Переходим на последнюю страницу
    fireEvent.click(nextButton); // page 1
    fireEvent.click(nextButton); // page 2
    expect(container?.style.transform).toBe('translateX(-200%)');

    // Возвращаемся назад
    fireEvent.click(prevButton);
    expect(container?.style.transform).toBe('translateX(-100%)');
    
    fireEvent.click(prevButton);
    expect(container?.style.transform).toMatch(/translateX\(-?0%\)/);
    
    expect(mockOnPrev).toHaveBeenCalledTimes(2);
  });

  it('should not navigate before first page', () => {
    render(
      <Gallery
        items={mockItems}
        itemsPerPage={3}
        updateItemsPerPage={mockUpdateItemsPerPage}
        onNext={mockOnNext}
        onPrev={mockOnPrev}
      />
    );

    const prevButton = screen.getByText('<');
    const container = document.querySelector<HTMLElement>('.flex');

    // На первой странице Prev disabled
    expect(prevButton.hasAttribute('disabled')).toBe(true);
    
    // Пытаемся кликнуть Prev
    fireEvent.click(prevButton);
    // Позиция не должна измениться
    expect(container?.style.transform).toMatch(/translateX\(-?0%\)/);
    expect(mockOnPrev).not.toHaveBeenCalled();
  });
});

  describe('Edge cases', () => {
    it('should handle empty items array', () => {
      render(
        <Gallery
          items={[]}
          itemsPerPage={3}
          updateItemsPerPage={mockUpdateItemsPerPage}
          onNext={mockOnNext}
          onPrev={mockOnPrev}
        />
      );

      const container = document.querySelector('.flex');
      expect(container?.children).toHaveLength(0);
      
      const prevButton = screen.getByText('<');
      const nextButton = screen.getByText('>');
      expect(prevButton.hasAttribute('disabled')).toBe(true);
      expect(nextButton.hasAttribute('disabled')).toBe(true);
    });

    it('should handle single item', () => {
      const singleItem: GalleryItem[] = [
        { id: '1', content: <div>Single Item</div> },
      ];

      render(
        <Gallery
          items={singleItem}
          itemsPerPage={1}
          updateItemsPerPage={mockUpdateItemsPerPage}
          onNext={mockOnNext}
          onPrev={mockOnPrev}
        />
      );

      expect(screen.getByText('Single Item')).toBeTruthy();
      
      const prevButton = screen.getByText('<');
      const nextButton = screen.getByText('>');
      expect(prevButton.hasAttribute('disabled')).toBe(true);
      expect(nextButton.hasAttribute('disabled')).toBe(true);
    });

    it('should handle itemsPerPage greater than items length', () => {
      render(
        <Gallery
          items={mockItems.slice(0, 2)}
          itemsPerPage={5}
          updateItemsPerPage={mockUpdateItemsPerPage}
          onNext={mockOnNext}
          onPrev={mockOnPrev}
        />
      );

      const prevButton = screen.getByText('<');
      const nextButton = screen.getByText('>');
      expect(prevButton.hasAttribute('disabled')).toBe(true);
      expect(nextButton.hasAttribute('disabled')).toBe(true);
    });

  });
});
