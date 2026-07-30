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

//   describe('Navigation - Forward', () => {
//     it('should navigate to next page when Next button is clicked', () => {
//       render(
//         <Gallery
//           items={mockItems}
//           itemsPerPage={3}
//           updateItemsPerPage={mockUpdateItemsPerPage}
//           onNext={mockOnNext}
//           onPrev={mockOnPrev}
//         />
//       );

//       const nextButton = screen.getByText('>');
//       const container = document.querySelector('.flex');

//       // Проверяем начальную позицию
//       expect(container).toHaveStyle('transform: translateX(0%)');

//       // Кликаем Next
//       fireEvent.click(nextButton);

//       // Проверяем, что трансформация изменилась
//       expect(container).toHaveStyle('transform: translateX(-33.3333%)');
//       expect(mockOnNext).toHaveBeenCalledTimes(1);
//     });

//     it('should navigate multiple pages forward', () => {
//       render(
//         <Gallery
//           items={mockItems}
//           itemsPerPage={2}
//           updateItemsPerPage={mockUpdateItemsPerPage}
//           onNext={mockOnNext}
//           onPrev={mockOnPrev}
//         />
//       );

//       const nextButton = screen.getByText('>');
//       const container = document.querySelector('.flex');

//       // Кликаем 3 раза (должно быть 3 страницы: 0->1->2)
//       fireEvent.click(nextButton);
//       expect(container).toHaveStyle('transform: translateX(-50%)');
      
//       fireEvent.click(nextButton);
//       expect(container).toHaveStyle('transform: translateX(-100%)');
      
//       fireEvent.click(nextButton);
//       // После 3-го клика мы на последней странице, позиция не меняется
//       expect(container).toHaveStyle('transform: translateX(-100%)');
      
//       expect(mockOnNext).toHaveBeenCalledTimes(3);
//     });

//     it('should not navigate beyond last page', () => {
//       render(
//         <Gallery
//           items={mockItems}
//           itemsPerPage={3}
//           updateItemsPerPage={mockUpdateItemsPerPage}
//           onNext={mockOnNext}
//           onPrev={mockOnPrev}
//         />
//       );

//       const nextButton = screen.getByText('>');
//       const container = document.querySelector('.flex');

//       // Кликаем до последней страницы
//       fireEvent.click(nextButton);
//       expect(container).toHaveStyle('transform: translateX(-33.3333%)');
      
//       // Пытаемся кликнуть еще раз
//       fireEvent.click(nextButton);
//       // Позиция не должна измениться
//       expect(container).toHaveStyle('transform: translateX(-33.3333%)');
      
//       // onNext должен быть вызван только при валидных кликах
//       expect(mockOnNext).toHaveBeenCalledTimes(1);
//     });
//   });

//   describe('Navigation - Backward', () => {
//     it('should navigate to previous page when Prev button is clicked', () => {
//       render(
//         <Gallery
//           items={mockItems}
//           itemsPerPage={3}
//           updateItemsPerPage={mockUpdateItemsPerPage}
//           onNext={mockOnNext}
//           onPrev={mockOnPrev}
//         />
//       );

//       const nextButton = screen.getByText('>');
//       const prevButton = screen.getByText('<');
//       const container = document.querySelector('.flex');

//       // Сначала переходим на вторую страницу
//       fireEvent.click(nextButton);
//       expect(container).toHaveStyle('transform: translateX(-33.3333%)');

//       // Теперь кликаем Prev
//       fireEvent.click(prevButton);
//       expect(container).toHaveStyle('transform: translateX(0%)');
//       expect(mockOnPrev).toHaveBeenCalledTimes(1);
//     });

//     it('should navigate multiple pages backward', () => {
//       render(
//         <Gallery
//           items={mockItems}
//           itemsPerPage={2}
//           updateItemsPerPage={mockUpdateItemsPerPage}
//           onNext={mockOnNext}
//           onPrev={mockOnPrev}
//         />
//       );

//       const nextButton = screen.getByText('>');
//       const prevButton = screen.getByText('<');
//       const container = document.querySelector('.flex');

//       // Переходим на последнюю страницу
//       fireEvent.click(nextButton); // page 1
//       fireEvent.click(nextButton); // page 2
//       expect(container).toHaveStyle('transform: translateX(-100%)');

//       // Возвращаемся назад
//       fireEvent.click(prevButton);
//       expect(container).toHaveStyle('transform: translateX(-50%)');
      
//       fireEvent.click(prevButton);
//       expect(container).toHaveStyle('transform: translateX(0%)');
      
//       expect(mockOnPrev).toHaveBeenCalledTimes(2);
//     });

//     it('should not navigate before first page', () => {
//       render(
//         <Gallery
//           items={mockItems}
//           itemsPerPage={3}
//           updateItemsPerPage={mockUpdateItemsPerPage}
//           onNext={mockOnNext}
//           onPrev={mockOnPrev}
//         />
//       );

//       const prevButton = screen.getByText('<');
//       const container = document.querySelector('.flex');

//       // На первой странице Prev disabled
//       expect(prevButton).toBeDisabled();
      
//       // Пытаемся кликнуть Prev
//       fireEvent.click(prevButton);
//       // Позиция не должна измениться
//       expect(container).toHaveStyle('transform: translateX(0%)');
//       expect(mockOnPrev).not.toHaveBeenCalled();
//     });
//   });

//   describe('Resize handling', () => {
//     it('should call updateItemsPerPage on resize', async () => {
//       render(
//         <Gallery
//           items={mockItems}
//           itemsPerPage={3}
//           updateItemsPerPage={mockUpdateItemsPerPage}
//           onNext={mockOnNext}
//           onPrev={mockOnPrev}
//         />
//       );

//       // Проверяем, что updateItemsPerPage вызван при монтировании
//       expect(mockUpdateItemsPerPage).toHaveBeenCalledWith(1200);

//       // Симулируем изменение размера окна
//       global.dispatchEvent(new Event('resize'));

//       // Ждем, чтобы эффект сработал
//       await waitFor(() => {
//         expect(mockUpdateItemsPerPage).toHaveBeenCalledTimes(2);
//       });
//     });

//     it('should update itemsPerPage when container width changes', () => {
//       const { rerender } = render(
//         <Gallery
//           items={mockItems}
//           itemsPerPage={3}
//           updateItemsPerPage={mockUpdateItemsPerPage}
//           onNext={mockOnNext}
//           onPrev={mockOnPrev}
//         />
//       );

//       expect(mockUpdateItemsPerPage).toHaveBeenCalledWith(1200);

//       // Мокаем новую ширину
//       Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
//         configurable: true,
//         value: 768,
//       });

//       // Перерендериваем с новыми пропсами
//       rerender(
//         <Gallery
//           items={mockItems}
//           itemsPerPage={2}
//           updateItemsPerPage={mockUpdateItemsPerPage}
//           onNext={mockOnNext}
//           onPrev={mockOnPrev}
//         />
//       );

//       // Проверяем, что updateItemsPerPage вызван с новой шириной
//       expect(mockUpdateItemsPerPage).toHaveBeenCalledWith(768);
//     });

//     it('should clean up resize event listener on unmount', () => {
//       const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      
//       const { unmount } = render(
//         <Gallery
//           items={mockItems}
//           itemsPerPage={3}
//           updateItemsPerPage={mockUpdateItemsPerPage}
//           onNext={mockOnNext}
//           onPrev={mockOnPrev}
//         />
//       );

//       unmount();
      
//       expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
//     });
//   });

//   describe('Edge cases', () => {
//     it('should handle empty items array', () => {
//       render(
//         <Gallery
//           items={[]}
//           itemsPerPage={3}
//           updateItemsPerPage={mockUpdateItemsPerPage}
//           onNext={mockOnNext}
//           onPrev={mockOnPrev}
//         />
//       );

//       const container = document.querySelector('.flex');
//       expect(container?.children).toHaveLength(0);
      
//       const prevButton = screen.getByText('<');
//       const nextButton = screen.getByText('>');
//       expect(prevButton).toBeDisabled();
//       expect(nextButton).toBeDisabled();
//     });

//     it('should handle single item', () => {
//       const singleItem: GalleryItem[] = [
//         { id: '1', content: <div>Single Item</div> },
//       ];

//       render(
//         <Gallery
//           items={singleItem}
//           itemsPerPage={1}
//           updateItemsPerPage={mockUpdateItemsPerPage}
//           onNext={mockOnNext}
//           onPrev={mockOnPrev}
//         />
//       );

//       expect(screen.getByText('Single Item')).toBeInTheDocument();
      
//       const prevButton = screen.getByText('<');
//       const nextButton = screen.getByText('>');
//       expect(prevButton).toBeDisabled();
//       expect(nextButton).toBeDisabled();
//     });

//     it('should handle itemsPerPage greater than items length', () => {
//       render(
//         <Gallery
//           items={mockItems.slice(0, 2)}
//           itemsPerPage={5}
//           updateItemsPerPage={mockUpdateItemsPerPage}
//           onNext={mockOnNext}
//           onPrev={mockOnPrev}
//         />
//       );

//       const prevButton = screen.getByText('<');
//       const nextButton = screen.getByText('>');
//       expect(prevButton).toBeDisabled();
//       expect(nextButton).toBeDisabled();
//     });

//     it('should render items with React nodes as content', () => {
//       const itemsWithComplexContent: GalleryItem[] = [
//         { id: '1', content: <div><h1>Title</h1><p>Description</p></div> },
//         { id: '2', content: <button>Click me</button> },
//       ];

//       render(
//         <Gallery
//           items={itemsWithComplexContent}
//           itemsPerPage={1}
//           updateItemsPerPage={mockUpdateItemsPerPage}
//           onNext={mockOnNext}
//           onPrev={mockOnPrev}
//         />
//       );

//       expect(screen.getByText('Title')).toBeInTheDocument();
//       expect(screen.getByText('Description')).toBeInTheDocument();
//       expect(screen.getByText('Click me')).toBeInTheDocument();
//     });
//   });

//   describe('Callbacks', () => {
//     it('should call onNext when navigating forward', () => {
//       render(
//         <Gallery
//           items={mockItems}
//           itemsPerPage={3}
//           updateItemsPerPage={mockUpdateItemsPerPage}
//           onNext={mockOnNext}
//           onPrev={mockOnPrev}
//         />
//       );

//       const nextButton = screen.getByText('>');
      
//       fireEvent.click(nextButton);
//       expect(mockOnNext).toHaveBeenCalledTimes(1);
      
//       fireEvent.click(nextButton);
//       expect(mockOnNext).toHaveBeenCalledTimes(2);
//     });

//     // it('should call onPrev when navigating backward', () => {
//     //   render(
//     //     <Gallery
//     //       items={mockItems}
//     //       itemsPerPage={3}
//     //       updateItemsPerPage={mockUpdateItemsPerPage}
//     //       onNext={mockOnNext}
//     //       onPrev={mockOnPrev}
//     //     />
//     //   );

//     //   const nextButton = screen.getByText('>');
//     //   const prevButton = screen.getByText('<');
      
//     //   // Сначала переходим вперед
//     //   fireEvent.click(nextButton);
      
//     //   // Теперь назад
//     //   fireEvent.click(prevButton);
//     //   expect(mockOnPrev).toHaveBeenCalledTimes(1);
      
//     //   fireEvent.click(prevButton);
//     //   expect(mockOnPrev).toHaveBeenCalledTimes(1); // Не вызывается, так как на первой странице
//     // });

//     // it('should not call onNext when navigation is disabled', () => {
//     //   render(
//     //     <Gallery
//     //       items={mockItems.slice(0, 3)}
//     //       itemsPerPage={3}
//     //       updateItemsPerPage={mockUpdateItemsPerPage}
//     //       onNext={mockOnNext}
//     //       onPrev={mockOnPrev}
//     //     />
//     //   );

//     //   const nextButton = screen.getByText('>');
//     //   expect(nextButton).toBeDisabled();
      
//     //   fireEvent.click(nextButton);
//     //   expect(mockOnNext).not.toHaveBeenCalled();
//     // });
//   });
});
