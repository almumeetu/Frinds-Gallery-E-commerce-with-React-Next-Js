import React, { useRef, useState, useEffect } from 'react';
import { MobileProductCard } from './MobileProductCard';
import type { Product } from '../types';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  onProductSelect: (product: Product) => void;
  viewAllLink?: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  addToCart: (productId: string, quantity: number) => void;
  buyNow: (productId: string, quantity: number) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, products, onProductSelect, viewAllLink, wishlist, toggleWishlist, addToCart, buyNow, onQuickView }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const timer = setTimeout(() => checkScrollability(), 100);
    container.addEventListener('scroll', checkScrollability);
    window.addEventListener('resize', checkScrollability);

    return () => {
        clearTimeout(timer);
        if (container) {
            container.removeEventListener('scroll', checkScrollability);
        }
        window.removeEventListener('resize', checkScrollability);
    };
  }, [products]);


  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h2>
        {viewAllLink && (
            <button onClick={viewAllLink} className="text-sm font-semibold text-brand-green hover:underline">
                সব দেখুন
            </button>
        )}
      </div>
       <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth space-x-4 pl-4 sm:pl-6 lg:pl-8 py-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div key={product.id} className="snap-start flex-shrink-0 w-48 sm:w-56">
              <MobileProductCard 
                  product={product} 
                  onProductSelect={onProductSelect} 
                  addToCart={addToCart} 
                  buyNow={buyNow}
                  isInWishlist={wishlist.includes(product.id)}
                  toggleWishlist={toggleWishlist}
                  onQuickView={onQuickView}
              />
            </div>
          ))}
        </div>
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg z-10 hidden md:block transition-opacity"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg z-10 hidden md:block transition-opacity"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
      </div>
    </section>
  );
};