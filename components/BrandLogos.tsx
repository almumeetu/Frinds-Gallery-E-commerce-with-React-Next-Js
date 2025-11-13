import React, { useRef, useState, useEffect } from 'react';

interface Brand {
    name: string;
    logoUrl: string;
}

interface BrandLogosProps {
    brands: Brand[];
}

export const BrandLogos: React.FC<BrandLogosProps> = ({ brands }) => {
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
    }, [brands]);

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">আমাদের ব্র্যান্ডসমূহ</h2>
            </div>
            <div className="relative p-6 bg-gray-50 rounded-lg">
                <div 
                    ref={scrollContainerRef}
                    className="flex items-center overflow-x-auto scroll-smooth space-x-16"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {brands.map((brand, index) => (
                        <div key={`${brand.name}-${index}`} className="flex-shrink-0">
                            <img 
                                src={brand.logoUrl} 
                                alt={brand.name}
                                className="h-12 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                )}
                {canScrollRight && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg z-10 hidden md:block transition-opacity"
                        aria-label="Scroll right"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                )}
            </div>
        </div>
    );
}