import React from 'react';
import type { Page } from '../App';

interface HeroGalleryProps {
    navigateTo: (page: Page) => void;
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({ navigateTo }) => {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 pt-4">
            <div className="relative bg-slate-200 h-64 md:h-[450px] rounded-lg overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        className="w-full h-full object-cover" 
                        src="https://i.ibb.co/6r1qGz8/khimar.jpg" 
                        alt="Fashionable clothing banner" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/10"></div>
                </div>
                <div className="relative w-full h-full flex items-center justify-start text-left px-8 md:px-16">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl drop-shadow-lg">
                           আপনার স্টাইলের সেরা ঠিকানা
                        </h1>
                        <p className="mt-4 max-w-lg text-lg text-gray-100 drop-shadow-md">
                           আবিষ্কার করুন আমাদের নতুন সব ডিজাইন, যা আপনাকে দেবে অনন্য पहचान।
                        </p>
                        <div className="mt-8">
                            <button 
                                onClick={() => navigateTo('shop')}
                                className="text-base font-medium rounded-full text-white bg-brand-accent hover:bg-amber-400 px-8 py-3 transition-transform transform hover:scale-105 shadow-lg"
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