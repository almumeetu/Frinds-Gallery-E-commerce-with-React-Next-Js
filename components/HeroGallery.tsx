import React from 'react';
import type { Page } from '../App';

interface HeroGalleryProps {
    navigateTo: (page: Page) => void;
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({ navigateTo }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="relative bg-gray-200 h-64 md:h-[450px] rounded-lg overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        className="w-full h-full object-cover" 
                        src="https://picsum.photos/1400/500?random=100" 
                        alt="Fashionable clothing banner" 
                    />
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                </div>
                <div className="relative max-w-7xl mx-auto h-full flex items-center justify-start text-left px-8 md:px-16">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl drop-shadow-lg">
                           সেরা কালেকশন সেরা দামে
                        </h1>
                        <p className="mt-4 max-w-lg text-lg text-gray-100 drop-shadow-md">
                           আপনার স্টাইলকে ফুটিয়ে তুলুন আমাদের নতুন সব ডিজাইনের সাথে।
                        </p>
                        <div className="mt-8">
                            <button 
                                onClick={() => navigateTo('shop')}
                                className="text-base font-medium rounded-full text-gray-900 bg-brand-yellow hover:bg-yellow-300 px-8 py-3 transition-transform transform hover:scale-105 shadow-lg"
                            >
                                এখনই কেনাকাটা করুন
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};