import React, { useState } from 'react';
import type { Product } from '../types';
import { HeartIcon, ShoppingCartIcon, BoltIcon, EyeIcon } from './icons';

interface MobileProductCardProps {
  product: Product;
  onProductSelect: (product: Product) => void;
  addToCart: (productId: string, quantity: number) => void;
  buyNow: (productId: string, quantity: number) => void;
  isInWishlist: boolean;
  toggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      ))}
      {halfStar && <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>}
      {[...Array(emptyStars)].map((_, i) => (
         <svg key={`empty-${i}`} className="w-4 h-4 text-slate-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      ))}
    </div>
  );
};

const Spinner: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);


export const MobileProductCard: React.FC<MobileProductCardProps> = ({ product, onProductSelect, addToCart, buyNow, isInWishlist, toggleWishlist, onQuickView }) => {
  const [loadingAction, setLoadingAction] = useState<'addToCart' | 'buyNow' | null>(null);
  
  const discount = product.originalPrice && product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;
    
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (loadingAction) return;
    setLoadingAction('addToCart');
    setTimeout(() => {
        addToCart(product.id, 1);
        setLoadingAction(null);
    }, 1000); // Simulate network delay
  };

  const handleBuyNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (loadingAction) return;
    setLoadingAction('buyNow');
    setTimeout(() => {
        buyNow(product.id, 1);
        setLoadingAction(null);
    }, 1000); // Simulate network delay
  };

  return (
    <div className="w-full h-full bg-white rounded-lg border border-slate-200/80 overflow-hidden group flex flex-col text-left relative transition-shadow duration-300 hover:shadow-xl">
      <div className="relative cursor-pointer" onClick={() => onProductSelect(product)}>
        <img 
          className="w-full h-48 sm:h-64 object-cover transform transition-transform duration-300 group-hover:scale-110" 
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
          className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full text-slate-500 hover:text-red-500 hover:bg-white transition-colors z-10"
          aria-label="Add to wishlist"
        >
          <HeartIcon className={`w-5 h-5 ${isInWishlist ? 'text-red-500' : ''}`} isFilled={isInWishlist} />
        </button>
         {product.stock > 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center z-10 flex-col space-y-2 p-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                    }}
                    className="text-white flex items-center bg-brand-dark bg-opacity-80 hover:bg-opacity-100 px-4 py-2 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300"
                    aria-label="Quick view"
                >
                    <EyeIcon className="h-4 w-4 mr-2" />
                    দ্রুত দেখুন
                </button>
                <button
                    onClick={handleAddToCart}
                    disabled={!!loadingAction}
                    className="flex items-center justify-center text-white bg-brand-green bg-opacity-90 hover:bg-opacity-100 px-4 py-2 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:delay-75 disabled:opacity-70"
                    aria-label="Add to cart"
                >
                    {loadingAction === 'addToCart' ? (
                        <Spinner className="h-4 w-4 text-white" />
                    ) : (
                        <>
                            <ShoppingCartIcon className="h-4 w-4 mr-2" />
                            কার্টে যোগ করুন
                        </>
                    )}
                </button>
            </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">স্টক শেষ</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
            <span className="text-sm text-slate-500">{product.category}</span>
            <h3 
              className="text-lg leading-snug font-semibold text-brand-dark cursor-pointer hover:text-brand-green mt-1"
              onClick={() => onProductSelect(product)}
            >
              {product.name}
            </h3>
            <div className="flex items-center mt-2 space-x-1">
              <StarRating rating={product.rating} />
              <span className="text-sm text-slate-500">({product.reviewCount})</span>
            </div>
        </div>
        
        <div className="mt-4">
          <span className="text-2xl font-bold text-brand-green">৳{product.price.toLocaleString('bn-BD')}</span>
          {product.originalPrice && (
              <span className="text-base text-slate-500 line-through ml-2">৳{product.originalPrice.toLocaleString('bn-BD')}</span>
          )}
        </div>

        <div className="mt-4 space-y-2">
            <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || !!loadingAction}
                className="w-full flex items-center justify-center px-3 py-2 border border-brand-green text-brand-green text-sm font-semibold rounded-md hover:bg-brand-green hover:text-white transition-colors disabled:bg-slate-200 disabled:text-slate-400 disabled:border-slate-200 disabled:cursor-not-allowed"
                aria-label="Add to cart"
            >
                {loadingAction === 'addToCart' ? (
                    <>
                        <Spinner className="h-4 w-4 mr-2" />
                        <span>প্রসেসিং...</span>
                    </>
                ) : (
                    <>
                       <ShoppingCartIcon className="h-4 w-4 mr-2" />
                       কার্টে যোগ করুন
                    </>
                )}
            </button>
            <button
                onClick={handleBuyNow}
                disabled={product.stock === 0 || !!loadingAction}
                className="w-full flex items-center justify-center px-3 py-2 bg-brand-green text-white text-sm font-semibold rounded-md hover:bg-brand-green-dark transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                aria-label="Buy Now"
            >
                {loadingAction === 'buyNow' ? (
                    <>
                        <Spinner className="h-4 w-4 mr-2" />
                        <span>প্রসেসিং...</span>
                    </>
                ) : (
                    <>
                        <BoltIcon className="h-4 w-4 mr-2" />
                        এখনি কিনুন
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};