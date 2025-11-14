import React from 'react';
import type { Category } from '../types';

interface TopCategoriesProps {
  categories: Category[];
  navigateToShop: (categoryId: string) => void;
}

export const TopCategories: React.FC<TopCategoriesProps> = ({ categories, navigateToShop }) => {
  return (
    <section className="w-full max-w-8xl mx-auto px-3 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark">টপ ক্যাটাগরি</h2>
        <p className="mt-2 text-sm sm:text-base text-slate-500">সবার পছন্দের সেরা কালেকশনগুলো দেখুন</p>
      </div>
      <div className="mt-6 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {categories.map((category) => (
          <button key={category.id} onClick={() => navigateToShop(category.id)} className="flex flex-col items-center group text-center">
            <div className="w-full aspect-square rounded-xl bg-white flex items-center justify-center group-hover:ring-4 group-hover:ring-brand-green/50 transition-all duration-200 overflow-hidden border">
                {category.imageUrl ? (
                    <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"/>
                ) : (
                    <span className="text-brand-dark-hover text-4xl">?</span>
                )}
            </div>
            <h3 className="mt-2 sm:mt-3 font-semibold text-slate-700 group-hover:text-brand-green text-sm sm:text-base">{category.name}</h3>
          </button>
        ))}
      </div>
    </section>
  );
};