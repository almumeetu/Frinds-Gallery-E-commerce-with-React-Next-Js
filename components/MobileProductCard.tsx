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
  // Use a fallback image if no image URL is derived
  const displayImage = product.imageUrl || '/images/products/default.webp';

  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Check if product is new (added within last 7 days)
  const isNew = product.date ? (new Date().getTime() - new Date(product.date).getTime()) < 7 * 24 * 60 * 60 * 1000 : false;

  return (
    <div className="w-full h-full bg-white rounded-2xl border border-slate-100 overflow-hidden group flex flex-col text-left relative transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1.5">
      <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden bg-slate-50 cursor-pointer" onClick={() => onProductSelect(product)}>
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-all duration-500 z-10" />

        {/* Quick View Button - centered and animated */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 bg-white text-brand-dark px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-brand-green hover:text-white flex items-center gap-2"
            aria-label="Quick view"
          >
            <EyeIcon className="h-4 w-4" />
            <span>Quick View</span>
          </button>
        </div>

        <img
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          src={displayImage}
          alt={product.name}
          loading="lazy"
          decoding="async"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
          {discount > 0 && (
            <div className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm">
              -{discount}%
            </div>
          )}
          {isNew && (
            <div className="bg-blue-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm">
              New
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 bg-white p-2.5 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 z-20 shadow-sm opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
          aria-label="Add to wishlist"
        >
          <HeartIcon className={`w-5 h-5 ${isInWishlist ? 'text-red-500 fill-current' : ''}`} isFilled={isInWishlist} />
        </button>

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-30 flex items-center justify-center">
            <span className="text-brand-dark font-bold text-sm uppercase tracking-widest border-2 border-brand-dark px-6 py-2 rounded-sm bg-white/80">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow relative bg-white">
        <div className="flex-grow">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">{product.category}</span>
          <h3
            className="text-[15px] leading-snug font-bold text-slate-900 cursor-pointer hover:text-brand-green transition-colors line-clamp-2 mb-2"
            onClick={() => onProductSelect(product)}
            title={product.name}
          >
            {product.name}
          </h3>
          <div className="mb-3">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-slate-50">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-lg font-black text-brand-green">৳{product.price.toLocaleString('bn-BD')}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through decoration-slate-400">৳{product.originalPrice.toLocaleString('bn-BD')}</span>
            )}
          </div>

          <div className="grid grid-cols-5 gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product.id, 1);
              }}
              disabled={product.stock === 0}
              className="col-span-1 flex items-center justify-center bg-slate-50 text-slate-700 rounded-lg hover:bg-brand-dark hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200 hover:border-brand-dark h-10 group/btn"
              aria-label="Add to cart"
              title="Add to Cart"
            >
              <ShoppingCartIcon className="h-5 w-5 transition-transform group-hover/btn:scale-110" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                buyNow(product.id, 1);
              }}
              disabled={product.stock === 0}
              className="col-span-4 flex items-center justify-center bg-brand-green text-white rounded-lg hover:bg-brand-green-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm tracking-wide h-10 shadow-md shadow-brand-green/20 hover:shadow-brand-green/40 hover:-translate-y-0.5 active:translate-y-0"
              aria-label="Buy now"
            >
              এখনই কিনুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};