import React from 'react';
import type { Product } from '../types';
import { HeartIcon, ShoppingCartIcon, EyeIcon } from './icons';

interface MobileProductCardProps {
  product: Product;
  onProductSelect: (product: Product) => void;
  addToCart: (productId: string, quantity: number) => void;
  buyNow: (productId: string, quantity: number) => void;
  isInWishlist: boolean;
  toggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

const StarRating: React.FC<{ rating: number, reviewCount: number }> = ({ rating, reviewCount }) => {
    return (
        <div className="flex items-center">
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'text-amber-400' : 'text-slate-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
            <span className="text-xs text-slate-500 ml-1.5">({reviewCount})</span>
        </div>
    );
};

export const MobileProductCard: React.FC<MobileProductCardProps> = ({ product, onProductSelect, addToCart, buyNow, isInWishlist, toggleWishlist, onQuickView }) => {
  const discount = product.originalPrice && product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="w-full h-full bg-white rounded-xl border border-slate-200/80 overflow-hidden group flex flex-col text-left relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative cursor-pointer" onClick={() => onProductSelect(product)}>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center z-10 p-2">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onQuickView(product);
                }}
                className="text-white flex items-center bg-brand-dark/80 backdrop-blur-sm hover:bg-brand-dark px-4 py-2 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0"
                aria-label="Quick view"
            >
                <EyeIcon className="h-4 w-4 mr-2" />
                দ্রুত দেখুন
            </button>
        </div>

        <img 
          className="w-full h-48 sm:h-64 object-cover transition-transform duration-300" 
          src={product.imageUrl} 
          alt={product.name} 
        />

        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
            {discount}% ছাড়
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full text-slate-500 hover:text-red-500 hover:bg-white transition-colors z-10"
          aria-label="Add to wishlist"
        >
          <HeartIcon className={`w-5 h-5 ${isInWishlist ? 'text-red-500' : ''}`} isFilled={isInWishlist} />
        </button>
        
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
            <span className="text-brand-dark font-bold text-base border border-brand-dark px-4 py-1.5 rounded-full">স্টক শেষ</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
            <span className="text-xs text-slate-500">{product.category}</span>
            <h3 
              className="text-base leading-snug font-semibold text-brand-dark cursor-pointer hover:text-brand-green mt-1"
              onClick={() => onProductSelect(product)}
            >
              {product.name}
            </h3>
            <div className="mt-2">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            </div>
        </div>
        
        <div className="mt-3">
          <div className="mb-3">
            <span className="text-xl font-bold text-brand-green">৳{product.price.toLocaleString('bn-BD')}</span>
            {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through ml-2">৳{product.originalPrice.toLocaleString('bn-BD')}</span>
            )}
          </div>
          
          <div className="flex flex-col gap-2">
            <button
              onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product.id, 1);
              }}
              disabled={product.stock === 0}
              className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-100 text-brand-dark rounded-lg hover:bg-brand-dark hover:text-white transition-colors disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed font-semibold text-xs sm:text-sm"
              aria-label="Add to cart"
            >
              <ShoppingCartIcon className="h-4 w-4 flex-shrink-0" />
              <span>কার্টে যোগ করুন</span>
            </button>
            
            <button
              onClick={(e) => {
                  e.stopPropagation();
                  buyNow(product.id, 1);
              }}
              disabled={product.stock === 0}
              className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-brand-green text-white rounded-lg hover:bg-brand-dark transition-colors disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed font-semibold text-xs sm:text-sm"
              aria-label="Buy now"
            >
              <span>এখনই কিনুন</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};