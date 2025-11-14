import React from 'react';
import type { Product, CartItem } from '../types';
import type { Page } from '../App';
import { ShoppingCartIcon } from './icons';

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
      <ShoppingCartIcon />
      <div className="text-sm font-bold">{itemCount} আইটেম</div>
      <div className="text-xs font-semibold bg-white text-brand-green px-2 py-0.5 rounded-full">৳{total.toLocaleString('bn-BD')}</div>
    </div>
  );
};