import React, { useState } from 'react';
import type { Page } from '../App';

interface HeaderProps {
    navigateTo: (page: Page) => void;
    cartItemCount: number;
    wishlistItemCount: number;
}

const Logo = () => (
    <div className="text-brand-green">
      <span className="text-4xl font-bold tracking-tighter">G</span>
      <span className="text-2xl font-semibold">Friend's</span>
      <div className="text-xs tracking-widest -mt-1 text-gray-600">Gallery 0.7</div>
    </div>
);

export const Header: React.FC<HeaderProps> = ({ navigateTo, cartItemCount, wishlistItemCount }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCategoryMenuOpen, setCategoryMenuOpen] = useState(false);

    const handleNavClick = (page: Page) => {
        navigateTo(page);
        setIsMenuOpen(false);
    };
    
    return (
        <header className="bg-white sticky top-0 z-40 shadow-sm">
            {/* Top bar */}
            <div className="bg-gray-100 text-gray-600 text-xs border-b">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-1.5">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => navigateTo('about')} className="hover:text-brand-green">আমাদের সম্পর্কে</button>
                        <button onClick={() => navigateTo('contact')} className="hover:text-brand-green">যোগাযোগ</button>
                        <button onClick={() => navigateTo('admin')} className="hover:text-brand-green font-semibold">অ্যাডমিন</button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold">হটলাইন:</span>
                        <a href="tel:01618803154" className="hover:text-brand-green">01618803154</a>
                    </div>
                 </div>
            </div>

            {/* Main Header */}
            <div className="py-4 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between space-x-4">
                        <div className="flex-shrink-0">
                             <button onClick={() => handleNavClick('home')} className="block">
                               <Logo />
                             </button>
                        </div>
                        <div className="flex-1 max-w-2xl">
                           <div className="relative">
                               <input type="search" placeholder="পণ্য খুঁজুন..." className="w-full border-gray-300 rounded-full shadow-sm pl-4 pr-10 py-2 focus:ring-brand-green focus:border-brand-green"/>
                               <button className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-gray-500 hover:text-brand-green">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                               </button>
                           </div>
                        </div>
                        <div className="flex items-center space-x-4">
                             <button onClick={() => handleNavClick('wishlist')} className="relative p-2 text-gray-600 hover:text-brand-green">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                               </svg>
                               {wishlistItemCount > 0 && <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-brand-yellow text-gray-900 text-xs font-bold flex items-center justify-center">{wishlistItemCount}</span>}
                            </button>
                             <button onClick={() => handleNavClick('checkout')} className="relative p-2 text-gray-600 hover:text-brand-green">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                               {cartItemCount > 0 && <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-brand-yellow text-gray-900 text-xs font-bold flex items-center justify-center">{cartItemCount}</span>}
                            </button>
                            <div className="hidden lg:flex items-center space-x-2 text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <div className="text-sm">
                                    <span className="block">হ্যালো, গেস্ট</span>
                                    <button onClick={() => navigateTo('account')} className="font-semibold hover:text-brand-green">লগইন / রেজিস্টার</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Bottom Nav */}
            <nav className="hidden lg:block border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-12">
                        <div className="relative">
                             <button 
                                onMouseEnter={() => setCategoryMenuOpen(true)}
                                onMouseLeave={() => setCategoryMenuOpen(false)}
                                className="bg-brand-green text-white px-6 py-3 font-semibold text-sm flex items-center h-12">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                                সকল ক্যাটাগরি
                            </button>
                            {isCategoryMenuOpen && (
                                <div 
                                    onMouseEnter={() => setCategoryMenuOpen(true)}
                                    onMouseLeave={() => setCategoryMenuOpen(false)}
                                    className="absolute left-0 mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1">
                                    <button onClick={() => handleNavClick('shop')} className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">লং খিমার</button>
                                    <button onClick={() => handleNavClick('shop')} className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">হিজাব</button>
                                    <button onClick={() => handleNavClick('shop')} className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">ইনার</button>
                                    <button onClick={() => handleNavClick('shop')} className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">থ্রি-পিস</button>
                                </div>
                            )}
                        </div>
                         <div className="flex items-center space-x-6 text-sm font-semibold text-gray-700">
                            <button onClick={() => handleNavClick('home')} className="hover:text-brand-green">হোম</button>
                            <button onClick={() => handleNavClick('shop')} className="hover:text-brand-green">শপ</button>
                            <button onClick={() => handleNavClick('hotDeals')} className="hover:text-brand-green">হট ডিল</button>
                            <button onClick={() => handleNavClick('about')} className="hover:text-brand-green">আমাদের সম্পর্কে</button>
                            <button onClick={() => handleNavClick('contact')} className="hover:text-brand-green">যোগাযোগ</button>
                         </div>
                         <button onClick={() => handleNavClick('hotDeals')} className="text-sm font-semibold text-red-600 hover:text-red-800">অফার</button>
                    </div>
                </div>
            </nav>
        </header>
    );
};