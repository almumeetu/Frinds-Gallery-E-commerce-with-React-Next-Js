import React, { useState } from 'react';
import type { Product } from '../types';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  addToCart: (productId: string, quantity: number) => void;
  buyNow: (productId: string, quantity: number) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, addToCart, buyNow, wishlist, toggleWishlist }) => {
  const [quantity, setQuantity] = useState(1);
  const isInWishlist = wishlist.includes(product.id);

  const discount = product.originalPrice && product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="quick-view-title">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10" aria-label="Close modal">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Image */}
          <div>
            <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-contain rounded-md" />
          </div>
          {/* Details */}
          <div>
            <h2 id="quick-view-title" className="text-3xl font-bold text-gray-900">{product.name}</h2>
            <p className="text-sm text-gray-500 mt-1">SKU: {product.sku}</p>
            {/* Price */}
            <div className="flex items-baseline space-x-2 mt-4">
                <p className="text-4xl text-brand-green font-bold">৳{product.price.toLocaleString('bn-BD')}</p>
                 {product.originalPrice && (
                    <p className="text-2xl text-gray-500 line-through">৳{product.originalPrice.toLocaleString('bn-BD')}</p>
                )}
                {discount > 0 && (
                    <span className="text-sm font-semibold text-red-600">({discount}% ছাড়)</span>
                )}
            </div>
            {/* Stock status */}
            <div className="mt-4">
                {product.stock > 0 ? (
                    <p className="text-sm text-green-600 font-semibold inline-flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>স্টকে আছে</p>
                ) : (
                    <p className="text-sm text-red-600 font-semibold inline-flex items-center"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>স্টক শেষ</p>
                )}
            </div>
            {/* Short description */}
            <div className="mt-4 text-base text-gray-600">
                <p>পণ্যের একটি সংক্ষিপ্ত বিবরণ এখানে থাকবে। এটি ব্যবহারকারীকে দ্রুত পণ্য সম্পর্কে ধারণা দেবে।</p>
            </div>
            {/* Actions */}
            <div className="mt-6">
                 <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-md">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 text-gray-600 hover:bg-gray-100">-</button>
                        <input type="text" value={quantity} readOnly className="w-12 text-center border-l border-r focus:outline-none"/>
                        <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2 text-gray-600 hover:bg-gray-100">+</button>
                    </div>
                    <button
                        onClick={() => {
                            addToCart(product.id, quantity);
                            onClose();
                        }}
                        disabled={product.stock === 0}
                        className="flex-1 bg-brand-yellow text-gray-900 py-3 px-6 border border-transparent rounded-md font-bold hover:bg-yellow-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                        কার্টে যোগ করুন
                    </button>
                    <button
                        onClick={() => toggleWishlist(product.id)}
                        className="p-3 border rounded-md hover:bg-gray-100"
                        aria-label="Add to wishlist"
                    >
                        <svg className={`w-6 h-6 ${isInWishlist ? 'text-red-500 fill-current' : 'text-gray-500 stroke-current'}`} fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"></path>
                        </svg>
                    </button>
                </div>
                <button
                    onClick={() => {
                        buyNow(product.id, quantity);
                        onClose();
                    }}
                    disabled={product.stock === 0}
                    className="w-full mt-4 bg-brand-green text-white py-3 px-8 border border-transparent rounded-md font-bold hover:bg-brand-green-dark disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                    এখনই কিনুন
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};