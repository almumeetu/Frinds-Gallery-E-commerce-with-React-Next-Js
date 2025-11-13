import React from 'react';
import type { Product, CartItem } from '../types';
import type { Page } from '../App';

interface FloatingCartProps {
  cart: CartItem[];
  products: Product[];
  navigateTo: (page: Page) => void;
}

export const FloatingCart: React.FC<FloatingCartProps> = ({ cart, products, navigateTo }) => {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  if (itemCount === 0) {
    return null;
  }

  return (
    <div 
        onClick={() => navigateTo('checkout')}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-brand-green text-white w-24 h-24 rounded-l-lg shadow-xl flex flex-col items-center justify-center cursor-pointer z-30 space-y-1 p-2 text-center transform hover:scale-105 transition-transform"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <div className="text-sm font-bold">{itemCount} আইটেম</div>
      <div className="text-xs font-semibold bg-white text-brand-green px-2 py-0.5 rounded-full">৳{total.toLocaleString('bn-BD')}</div>
    </div>
  );
};
