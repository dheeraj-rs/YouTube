'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '@/data';
import { useApp } from '@/providers/AppProvider';
import clsx from 'clsx';

export function CategoryPills() {
  const { selectedCategory, setSelectedCategory } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const checkScroll = () => {
      setShowLeftButton(container.scrollLeft > 20);
      setShowRightButton(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 20
      );
    };
    
    container.addEventListener('scroll', checkScroll);
    checkScroll();
    return () => container.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { current } = containerRef;
      const scrollAmount = direction === 'left' ? -200 : 200;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {showLeftButton && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-dark from-50% to-transparent w-24 h-full z-10 flex items-center">
          <button
            onClick={() => scroll('left')}
            className="h-8 w-8 flex items-center justify-center hover:bg-dark-surface rounded-full transition-colors ml-2"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      )}
      
      <div
        ref={containerRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-4 py-2 scroll-smooth max-w-full"
      >
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={clsx(
              "px-4 py-1.5 rounded-lg whitespace-nowrap text-sm font-medium transition-all duration-200",
              selectedCategory === category
                ? "bg-white text-black"
                : "bg-dark-surface hover:bg-[#3f3f3f] text-white"
            )}
          >
            {category}
          </button>
        ))}
      </div>
      
      {showRightButton && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-dark from-50% to-transparent w-24 h-full z-10 flex items-center justify-end">
          <button
            onClick={() => scroll('right')}
            className="h-8 w-8 flex items-center justify-center hover:bg-dark-surface rounded-full transition-colors mr-2"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}