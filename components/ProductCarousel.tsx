import React from 'react';
import { MobileProductCard } from './MobileProductCard';
import type { Product } from '../types';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  onProductSelect: (product: Product) => void;
  viewAllLink?: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  addToCart: (productId: string, quantity: number) => void;
  buyNow: (productId: string, quantity: number) => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, products, onProductSelect, viewAllLink, wishlist, toggleWishlist, addToCart, buyNow }) => {

  const duplicatedProducts = [...products, ...products];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h2>
        {viewAllLink && (
            <button onClick={viewAllLink} className="text-sm font-semibold text-brand-green hover:underline">
                সব দেখুন
            </button>
        )}
      </div>
      <div className="group overflow-hidden">
        <div className="flex animate-marquee-fast">
          {duplicatedProducts.map((product, index) => (
            <div key={`${product.id}-${index}`} className="flex-shrink-0 w-48 sm:w-56 px-2">
              <MobileProductCard 
                  product={product} 
                  onProductSelect={onProductSelect} 
                  addToCart={addToCart} 
                  buyNow={buyNow}
                  isInWishlist={wishlist.includes(product.id)}
                  toggleWishlist={toggleWishlist}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};