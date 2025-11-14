import React from 'react';
import type { Page } from '../App';

interface HeroGalleryProps {
    navigateTo: (page: Page) => void;
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({ navigateTo }) => {
    return (
        <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="relative bg-slate-800 h-80 md:h-[550px] rounded-2xl overflow-hidden shadow-lg">
                <div className="absolute inset-0">
                    <img 
                        className="w-full h-full object-cover object-center" 
                        src="https://i.ibb.co/6r1qGz8/khimar.jpg" 
                        alt="Fashionable clothing banner" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                </div>
                <div className="relative w-full h-full flex items-center justify-start text-left px-8 md:px-20">
                    <div className="max-w-md lg:max-w-lg">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-lg">
                           আপনার স্টাইলের সেরা ঠিকানা
                        </h1>
                        <p className="mt-4 max-w-lg text-lg text-gray-100 drop-shadow-md">
                           আবিষ্কার করুন আমাদের নতুন সব ডিজাইন, যা আপনাকে দেবে অনন্য पहचान।
                        </p>
                        <div className="mt-8">
                            <button 
                                onClick={() => navigateTo('shop')}
                                className="text-base font-semibold rounded-full text-brand-dark bg-brand-accent hover:bg-amber-400 px-8 py-3.5 transition-transform transform hover:scale-105 shadow-lg"
                            >
                                এখনই কেনাকাটা করুন &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};