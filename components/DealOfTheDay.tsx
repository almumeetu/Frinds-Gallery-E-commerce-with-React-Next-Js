import React, { useState, useEffect } from 'react';
import { ProductCarousel } from './ProductCarousel';
import type { Product } from '../types';

interface DealOfTheDayProps {
    products: Product[];
    onProductSelect: (product: Product) => void;
    wishlist: string[];
    toggleWishlist: (productId: string) => void;
    addToCart: (productId: string, quantity: number) => void;
    buyNow: (productId: string, quantity: number) => void;
}

const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2024-12-31") - +new Date();
        let timeLeft = {};

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
                <div key={unit} className="bg-white/20 p-2 sm:p-3 rounded-md">
                    <div className="text-xl sm:text-2xl font-bold">{String(value).padStart(2, '0')}</div>
                    <div className="text-xs sm:text-sm uppercase">{unit}</div>
                </div>
            ))}
        </div>
    );
};

export const DealOfTheDay: React.FC<DealOfTheDayProps> = (props) => {
    return (
        <section className="bg-brand-dark py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                 <div className="sm:flex justify-between items-center mb-8 text-center sm:text-left">
                     <div>
                        <h2 className="text-3xl font-bold sm:text-4xl">ডিল অফ দ্য ডে</h2>
                        <p className="mt-2 text-gray-300">এই অফার সীমিত সময়ের জন্য!</p>
                     </div>
                     <div className="mt-4 sm:mt-0">
                        <CountdownTimer />
                     </div>
                 </div>
            </div>
            <ProductCarousel {...props} title="" />
        </section>
    );
};