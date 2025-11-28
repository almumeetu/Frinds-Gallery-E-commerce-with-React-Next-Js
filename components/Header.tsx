
import React, { useState, useEffect } from 'react';
import type { Page } from '../App';
import { categories } from '../constants';
import type { Customer } from '../types';
import { SearchIcon, HeartIcon, ShoppingCartIcon, UserCircleIcon, Bars3Icon, XMarkIcon, CubeIcon, UserIcon, ArrowLeftOnRectangleIcon, Cog6ToothIcon } from './icons';

interface HeaderProps {
    navigateTo: (page: Page) => void;
    navigateToShop: (categoryId: string) => void;
    cartItemCount: number;
    wishlistItemCount: number;
    currentUser: Customer | null;
    onLogout: () => void;
}

const Logo = () => (
    <div className="text-brand-green font-bold text-lg sm:text-xl md:text-2xl tracking-tight whitespace-nowrap">
      Friend's Gallery
    </div>
);

// Designated admin user for demo purposes
const ADMIN_EMAIL = 'amina@example.com';

export const Header: React.FC<HeaderProps> = ({ navigateTo, navigateToShop, cartItemCount, wishlistItemCount, currentUser, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
        return () => {
          document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    const handleNavClick = (page: Page) => {
        navigateTo(page);
        setIsMenuOpen(false);
    };

    const handleCategoryClick = (categoryId: string) => {
        navigateToShop(categoryId);
        setIsMenuOpen(false);
    }
    
    return (
        <header className="bg-white/90 sticky top-0 z-40 shadow-sm backdrop-blur-lg">
            <div className="w-full mx-auto max-w-8xl px-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    <div className="flex items-center">
                        <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-brand-green" aria-label="Open menu">
                            <Bars3Icon />
                        </button>
                        <div className="ml-2 lg:ml-0">
                             <button onClick={() => handleNavClick('home')} className="block">
                               <Logo />
                             </button>
                        </div>
                    </div>

                     <nav className="hidden lg:flex items-center space-x-8 text-base font-medium text-slate-700">
                        <button onClick={() => handleNavClick('home')} className="hover:text-brand-green transition-colors">হোম</button>
                        <button onClick={() => navigateToShop('all')} className="hover:text-brand-green transition-colors">শপ</button>
                        <button onClick={() => handleNavClick('hotDeals')} className="hover:text-brand-green transition-colors">হট ডিল</button>
                        <div className="relative group">
                            <button className="flex items-center group-hover:text-brand-green transition-colors">
                                ক্যাটাগরি
                                <svg className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1 z-50">
                                {categories.map(cat => (
                                    <button key={cat.id} onClick={() => handleCategoryClick(cat.id)} className="block text-left w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-green">{cat.name}</button>
                                ))}
                            </div>
                        </div>
                        <button onClick={() => handleNavClick('contact')} className="hover:text-brand-green transition-colors">যোগাযোগ</button>
                     </nav>

                    <div className="flex items-center space-x-1 sm:space-x-4">
                         <button onClick={() => handleNavClick('wishlist')} className="relative p-1.5 sm:p-2 text-slate-600 hover:text-brand-green">
                           <HeartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                           {wishlistItemCount > 0 && <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 block h-4 w-4 rounded-full bg-brand-accent text-white text-[10px] font-bold flex items-center justify-center">{wishlistItemCount}</span>}
                        </button>
                         <button onClick={() => handleNavClick('checkout')} className="relative p-1.5 sm:p-2 text-slate-600 hover:text-brand-green">
                            <ShoppingCartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                           {cartItemCount > 0 && <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 block h-4 w-4 rounded-full bg-brand-accent text-white text-[10px] font-bold flex items-center justify-center">{cartItemCount}</span>}
                        </button>
                         <div className="hidden sm:block h-6 w-px bg-slate-200"></div>
                         <div className="relative group">
                            <button onClick={() => navigateTo('account')} className="p-1.5 sm:p-2 text-slate-600 hover:text-brand-green">
                                <UserCircleIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                            </button>
                            <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 px-4 text-sm z-50">
                               {currentUser ? (
                                    <>
                                        <p className="font-semibold text-slate-800">হ্যালো, {currentUser.name.split(' ')[0]}</p>
                                        <p className="text-slate-500 mb-3">{currentUser.email}</p>
                                        <button onClick={() => navigateTo('account')} className="block w-full text-left font-medium text-brand-green hover:underline py-1">আমার অ্যাকাউন্ট</button>
                                        {currentUser.email === ADMIN_EMAIL && (
                                            <button onClick={() => navigateTo('admin')} className="block w-full text-left font-medium text-brand-green hover:underline py-1">অ্যাডমিন ড্যাশবোর্ড</button>
                                        )}
                                        <button onClick={onLogout} className="block w-full text-left font-medium text-red-600 hover:underline py-1 mt-1 border-t pt-2">লগআউট</button>
                                    </>
                                ) : (
                                    <>
                                        <p className="font-semibold text-slate-800 mb-2">ফ্রেন্ডস গ্যালারিতে স্বাগতম</p>
                                        <button onClick={() => navigateTo('account')} className="w-full bg-brand-green text-white py-2 rounded-md font-semibold hover:bg-brand-green-dark transition-all">লগইন / রেজিস্টার</button>
                                    </>
                                )}
                            </div>
                         </div>
                    </div>
                </div>
            </div>
            
            <div className={`lg:hidden fixed inset-0 z-50 transition-opacity ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
                
                <div className={`fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col h-full ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="p-4 flex justify-between items-center border-b">
                        <button onClick={() => handleNavClick('home')}><Logo /></button>
                        <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-500 hover:text-brand-green" aria-label="Close menu">
                            <XMarkIcon />
                        </button>
                    </div>
                    
                    <div className="flex-grow overflow-y-auto">
                        <div className="p-4">
                            <div className="relative mb-4">
                               <input type="search" placeholder="পণ্য খুঁজুন..." className="w-full rounded-full pl-4 pr-10"/>
                               <button className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-slate-500 hover:text-brand-green">
                                   <SearchIcon />
                               </button>
                            </div>

                             <nav className="space-y-1">
                                 <button onClick={() => handleNavClick('home')} className="block w-full text-left font-semibold py-2.5 px-3 rounded-md hover:bg-slate-100">হোম</button>
                                 <button onClick={() => navigateToShop('all')} className="block w-full text-left font-semibold py-2.5 px-3 rounded-md hover:bg-slate-100">শপ</button>
                                 <button onClick={() => handleNavClick('hotDeals')} className="block w-full text-left font-semibold py-2.5 px-3 rounded-md hover:bg-slate-100">হট ডিল</button>
                             </nav>
                         </div>
                         
                         <div className="border-t p-4">
                            <h3 className="font-bold text-slate-800 px-3 py-2">ক্যাটাগরি</h3>
                            <nav className="space-y-1">
                                {categories.map(cat => (
                                    <button key={cat.id} onClick={() => handleCategoryClick(cat.id)} className="block w-full text-left py-2.5 px-3 rounded-md hover:bg-slate-100 text-slate-600">{cat.name}</button>
                                ))}
                            </nav>
                         </div>
                         
                         <div className="border-t p-4">
                            <nav className="space-y-1">
                                <button onClick={() => handleNavClick('about')} className="block w-full text-left font-semibold py-2.5 px-3 rounded-md hover:bg-slate-100">আমাদের সম্পর্কে</button>
                                <button onClick={() => handleNavClick('contact')} className="block w-full text-left font-semibold py-2.5 px-3 rounded-md hover:bg-slate-100">যোগাযোগ</button>
                            </nav>
                         </div>
                    </div>

                    <div className="p-4 border-t bg-slate-50">
                         {currentUser ? (
                             <div className="space-y-2">
                                <p className="px-3 text-sm text-slate-500">হ্যালো, <strong>{currentUser.name}</strong></p>
                                <button onClick={() => handleNavClick('account')} className="w-full flex items-center text-left px-3 py-2.5 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-200">
                                   <UserIcon className="mr-3" /> আমার অ্যাকাউন্ট
                                </button>
                                {currentUser.email === ADMIN_EMAIL && (
                                     <button onClick={() => handleNavClick('admin')} className="w-full flex items-center text-left px-3 py-2.5 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-200">
                                       <Cog6ToothIcon className="mr-3" /> অ্যাডমিন ড্যাশবোর্ড
                                    </button>
                                )}
                                <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="w-full flex items-center text-left px-3 py-2.5 rounded-md text-sm font-semibold text-red-600 hover:bg-red-50">
                                   <ArrowLeftOnRectangleIcon className="mr-3" /> লগআউট
                                </button>
                             </div>
                         ) : (
                            <button onClick={() => handleNavClick('account')} className="w-full bg-brand-green text-white py-2.5 rounded-lg font-semibold hover:bg-brand-green-dark transition-all">
                                লগইন / রেজিস্টার
                            </button>
                         )}
                     </div>
                </div>
            </div>
        </header>
    );
};