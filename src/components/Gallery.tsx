import React, { useEffect, useState, useRef } from "react";

export interface GalleryItem {
  id: string;
  content: React.ReactNode;
}

interface GalleryProps {
  items: GalleryItem[];
  itemsPerPage: number;
  updateItemsPerPage: (width: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({
  items,
  itemsPerPage,
  updateItemsPerPage,
  onNext,
  onPrev,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        updateItemsPerPage(width);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateItemsPerPage]);

  // Проверяем, доступны ли кнопки
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= items.length - itemsPerPage;

  const handleNext = () => {
    if (isNextDisabled) return;
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, items.length - itemsPerPage),
    );
    onNext();
  };

  const handlePrev = () => {
    if (isPrevDisabled) return;
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
    onPrev();
  };

  return (
    <div className="relative w-full overflow-hidden" ref={containerRef}>
      <div
        className="flex transition-transform duration-300"
        style={{
          transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-full ${
              itemsPerPage === 1
                ? "sm:w-full"
                : itemsPerPage === 2
                  ? "sm:w-1/2"
                  : "sm:w-1/3"
            } p-4`}
          >
            <div className="basic text-lg widget p-8 h-full flex flex-col">
              {item.content}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        disabled={isPrevDisabled}
        className={`absolute -left-1.5 top-1/2 transform -translate-y-1/2 basic text-sm p-2 transition-opacity duration-200 ${
          isPrevDisabled ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:opacity-80"
        }`}
        style={{ transform: "scaleY(3)" }}
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        className={`absolute -right-1.5 top-1/2 transform -translate-y-1/2 basic text-sm p-2 transition-opacity duration-200 ${
          isNextDisabled ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:opacity-80"
        }`}
        style={{ transform: "scaleY(3)" }}
      >
        &gt;
      </button>
    </div>
  );
};
