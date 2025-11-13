import React from 'react';
import { ProductsGrid } from '../components/ProductsGrid';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { mockProducts } from '../constants';
import type { Product } from '../types';
import type { Page } from '../App';

interface WishlistPageProps {
    wishlistProductIds: string[];
    onProductSelect: (product: Product) => void;
    addToCart: (productId: string, quantity: number) => void;
    buyNow: (productId: string, quantity: number) => void;
    toggleWishlist: (productId: string) => void;
    navigateTo: (page: Page) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ wishlistProductIds, onProductSelect, addToCart, buyNow, toggleWishlist, navigateTo }) => {
    const wishlistProducts = mockProducts.filter(p => wishlistProductIds.includes(p.id));

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumbs items={[{ label: 'হোম', href: '#' }, { label: 'আমার পছন্দের তালিকা' }]} />
                
                <div className="mt-6">
                    <h1 className="text-3xl font-bold text-gray-900">আমার পছন্দের তালিকা</h1>

                    {wishlistProducts.length > 0 ? (
                        <div className="mt-8">
                            <ProductsGrid 
                                products={wishlistProducts} 
                                onProductSelect={onProductSelect} 
                                addToCart={addToCart}
                                buyNow={buyNow}
                                wishlist={wishlistProductIds}
                                toggleWishlist={toggleWishlist}
                            />
                        </div>
                    ) : (
                        <div className="mt-12 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                            </svg>
                            <h2 className="mt-2 text-xl font-semibold text-gray-800">আপনার পছন্দের তালিকা খালি</h2>
                            <p className="mt-1 text-gray-500">পণ্য ব্রাউজ করুন এবং আপনার পছন্দের পণ্য যোগ করুন।</p>
                            <button
                                onClick={() => navigateTo('shop')}
                                className="mt-6 bg-brand-green text-white py-2 px-6 rounded-md font-semibold hover:bg-brand-green-dark"
                            >
                                এখনই শপ করুন
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};