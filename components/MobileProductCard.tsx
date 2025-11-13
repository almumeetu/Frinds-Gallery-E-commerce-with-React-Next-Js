import React from 'react';
import type { Product } from '../types';

interface MobileProductCardProps {
  product: Product;
  onProductSelect: (product: Product) => void;
  addToCart: (productId: string, quantity: number) => void;
  buyNow: (productId: string, quantity: number) => void;
  isInWishlist: boolean;
  toggleWishlist: (productId: string) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      ))}
      {halfStar && <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>}
      {[...Array(emptyStars)].map((_, i) => (
         <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      ))}
    </div>
  );
};


export const MobileProductCard: React.FC<MobileProductCardProps> = ({ product, onProductSelect, addToCart, buyNow, isInWishlist, toggleWishlist }) => {
  const discount = product.originalPrice && product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;
    
  return (
    <div className="w-full bg-white rounded-lg border border-gray-200/80 overflow-hidden group flex flex-col text-left relative transition-shadow hover:shadow-lg">
      <div className="relative cursor-pointer" onClick={() => onProductSelect(product)}>
        <img 
          className="w-full h-48 sm:h-64 object-cover transform transition-transform duration-300 group-hover:scale-105" 
          src={product.imageUrl} 
          alt={product.name} 
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
            {discount}% ছাড়
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition-colors z-10"
          aria-label="Add to wishlist"
        >
          <svg className={`w-5 h-5 ${isInWishlist ? 'text-red-500 fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"></path>
          </svg>
        </button>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">স্টক শেষ</span>
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <span className="text-xs text-gray-500">{product.category}</span>
        <h3 
          className="text-sm font-semibold text-gray-800 cursor-pointer hover:text-brand-green mt-1 flex-grow"
          onClick={() => onProductSelect(product)}
        >
          {product.name}
        </h3>
        <div className="flex items-center mt-2 space-x-1">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>
        <div className="mt-3">
          <span className="text-lg font-bold text-brand-green">৳{product.price.toLocaleString('bn-BD')}</span>
          {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">৳{product.originalPrice.toLocaleString('bn-BD')}</span>
          )}
        </div>
        <div className="mt-3 space-y-2">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product.id, 1);
                }}
                disabled={product.stock === 0}
                className="w-full flex items-center justify-center px-3 py-2 border border-brand-green text-brand-green text-sm font-semibold rounded-md hover:bg-brand-green hover:text-white transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
                aria-label="Add to cart"
            >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                কার্টে যোগ করুন
            </button>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    buyNow(product.id, 1);
                }}
                disabled={product.stock === 0}
                className="w-full flex items-center justify-center px-3 py-2 bg-brand-green text-white text-sm font-semibold rounded-md hover:bg-brand-green-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                aria-label="Buy Now"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                এখনি কিনুন
            </button>
        </div>
      </div>
    </div>
  );
};