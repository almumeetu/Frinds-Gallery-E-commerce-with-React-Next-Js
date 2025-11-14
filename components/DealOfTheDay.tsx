import React, { useState, useEffect } from 'react';
import type { Product } from '../types';

interface DealOfTheDayProps {
    product: Product;
    buyNow: (productId: string, quantity: number) => void;
    navigateToShop: (categoryId: string) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      ))}
      {halfStar && <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>}
      {[...Array(emptyStars)].map((_, i) => (
         <svg key={`empty-${i}`} className="w-5 h-5 text-slate-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      ))}
    </div>
  );
};


const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date(new Date().getFullYear() + 1, 0, 1) - +new Date();
        let timeLeft: { [key: string]: number } = {};

        if (difference > 0) {
            timeLeft = {
                দিন: Math.floor(difference / (1000 * 60 * 60 * 24)),
                ঘন্টা: Math.floor((difference / (1000 * 60 * 60)) % 24),
                মিনিট: Math.floor((difference / 1000 / 60) % 60),
                সেকেন্ড: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    return (
        <div className="flex space-x-2 sm:space-x-4 text-center">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="bg-white/80 text-brand-dark p-2 sm:p-3 rounded-md shadow-sm w-20">
                    <div className="text-xl sm:text-2xl font-bold">{String(value).padStart(2, '0')}</div>
                    <div className="text-xs sm:text-sm uppercase">{unit}</div>
                </div>
            ))}
        </div>
    );
};

export const DealOfTheDay: React.FC<DealOfTheDayProps> = ({ product, buyNow, navigateToShop }) => {
    return (
         <section className="bg-emerald-50/50">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <div className="w-full h-96 rounded-lg overflow-hidden group">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>

                    {/* Content */}
                    <div>
                        <h2 className="text-3xl font-bold text-brand-dark sm:text-4xl">ডিল অফ দ্য ডে</h2>
                        <p className="mt-2 text-slate-600">এই অফার সীমিত সময়ের জন্য!</p>
                        
                        <div className="my-6">
                            <CountdownTimer />
                        </div>
                        
                        <h3 className="text-2xl font-semibold text-brand-dark hover:text-brand-green cursor-pointer">{product.name}</h3>
                        
                        <div className="flex items-center mt-2 space-x-2">
                          <StarRating rating={product.rating} />
                          <span className="text-sm text-slate-500">({product.reviewCount} রিভিউ)</span>
                        </div>
                        
                        <div className="my-4">
                          <span className="text-4xl font-bold text-brand-green">৳{product.price.toLocaleString('bn-BD')}</span>
                          {product.originalPrice && (
                              <span className="text-xl text-slate-500 line-through ml-3">৳{product.originalPrice.toLocaleString('bn-BD')}</span>
                          )}
                        </div>

                        <div className="mt-8 flex items-center space-x-4">
                            <button onClick={() => buyNow(product.id, 1)} className="bg-brand-green text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-green-dark transition-colors text-lg">
                                এখনই কিনুন
                            </button>
                            <button onClick={() => navigateToShop('all')} className="text-brand-dark font-bold py-3 px-8 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 transition-colors text-lg">
                                আরও দেখুন
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};