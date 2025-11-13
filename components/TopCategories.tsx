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
}

const categoryIcons = [
    '👗', '👘', '🧣', '👙', '🧤'
];

export const TopCategories: React.FC<TopCategoriesProps> = ({ categories, products, onProductSelect, wishlist, toggleWishlist, addToCart, buyNow }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">টপ ক্যাটাগরি</h2>
        <p className="mt-2 text-gray-500">সবার পছন্দের সেরা কালেকশনগুলো দেখুন</p>
      </div>
      <div className="mt-10 flex justify-center flex-wrap gap-4 sm:gap-8">
        {categories.map((category, index) => (
          <a key={category.id} href="#" className="flex flex-col items-center group">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-4xl group-hover:bg-brand-green transition-colors">
                {categoryIcons[index % categoryIcons.length]}
            </div>
            <h3 className="mt-3 font-semibold text-gray-700 group-hover:text-brand-green">{category.name}</h3>
          </a>
        ))}
      </div>
      <div className="mt-12">
        <ProductsGrid products={products} onProductSelect={onProductSelect} addToCart={addToCart} buyNow={buyNow} wishlist={wishlist} toggleWishlist={toggleWishlist} />
      </div>
       <div className="text-center mt-8">
         <button className="font-semibold text-brand-green border border-brand-green rounded-full px-6 py-2 hover:bg-brand-green hover:text-white transition-colors">
            সকল পণ্য দেখুন &rarr;
         </button>
       </div>
    </section>
  );
};