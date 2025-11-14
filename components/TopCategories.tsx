import React from 'react';
import type { Category, Product } from '../types';
import { ProductsGrid } from './ProductsGrid';

interface TopCategoriesProps {
  categories: Category[];
  products: Product[];
  onProductSelect: (product: Product) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  addToCart: (productId: string, quantity: number) => void;
  buyNow: (productId: string, quantity: number) => void;
  onQuickView: (product: Product) => void;
  navigateToShop: (categoryId: string) => void;
}

export const TopCategories: React.FC<TopCategoriesProps> = ({ categories, products, onProductSelect, wishlist, toggleWishlist, addToCart, buyNow, onQuickView, navigateToShop }) => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-brand-dark sm:text-4xl">টপ ক্যাটাগরি</h2>
        <p className="mt-2 text-slate-500">সবার পছন্দের সেরা কালেকশনগুলো দেখুন</p>
      </div>
      <div className="mt-10 flex justify-center flex-wrap gap-4 sm:gap-8">
        {categories.map((category) => (
          <button key={category.id} onClick={() => navigateToShop(category.id)} className="flex flex-col items-center group">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-4xl group-hover:ring-4 group-hover:ring-brand-green/50 transition-all duration-200 overflow-hidden border">
                {category.imageUrl ? (
                    <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover"/>
                ) : (
                    <span className="text-brand-dark-hover">?</span>
                )}
            </div>
            <h3 className="mt-3 font-semibold text-slate-700 group-hover:text-brand-green text-lg">{category.name}</h3>
          </button>
        ))}
      </div>
      <div className="mt-12">
        <ProductsGrid products={products.slice(0,4)} onProductSelect={onProductSelect} addToCart={addToCart} buyNow={buyNow} wishlist={wishlist} toggleWishlist={toggleWishlist} onQuickView={onQuickView} />
      </div>
       <div className="text-center mt-8">
         <button onClick={() => navigateToShop('all')} className="font-semibold text-brand-green border border-brand-green rounded-full px-6 py-2 hover:bg-brand-green hover:text-white transition-colors">
            সকল পণ্য দেখুন &rarr;
         </button>
       </div>
    </section>
  );
};