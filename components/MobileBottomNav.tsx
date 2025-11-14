import React from 'react';
import type { Page } from '../App';
import { HomeIcon, ShoppingBagIcon, HeartIcon, UserCircleIcon } from './icons';

interface MobileBottomNavProps {
  currentPage: Page;
  navigateTo: (page: Page) => void;
}

const navItems = [
  { page: 'home' as Page, label: 'হোম', icon: <HomeIcon className="h-6 w-6" /> },
  { page: 'shop' as Page, label: 'শপ', icon: <ShoppingBagIcon className="h-6 w-6" /> },
  { page: 'wishlist' as Page, label: 'পছন্দ', icon: <HeartIcon className="h-6 w-6" /> },
  { page: 'account' as Page, label: 'অ্যাকাউন্ট', icon: <UserCircleIcon className="h-6 w-6" /> },
];

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentPage, navigateTo }) => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-1px_4px_rgba(0,0,0,0.06)] z-40">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = currentPage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => navigateTo(item.page)}
              className={`flex flex-col items-center justify-center space-y-1 w-full transition-colors duration-200 ${
                isActive ? 'text-brand-green' : 'text-slate-500 hover:text-brand-green'
              }`}
            >
              {React.cloneElement(item.icon, { isFilled: isActive && item.page === 'wishlist' })}
              <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};